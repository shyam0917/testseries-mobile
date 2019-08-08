import { Component, OnInit, ViewChild, NgZone, OnDestroy } from "@angular/core";
import * as Connectivity from "tns-core-modules/connectivity";
import { NavigationEnd, Router, ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { AuthenticationService } from "./services/authentication.service";
import { StudentService } from "./services/student.service";
import { MessageService } from "./services/message.service";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { filter } from "rxjs/operators";
import * as app from "tns-core-modules/application";

@Component({
	moduleId: module.id,
	selector: "ns-app",
	templateUrl: "app.component.html",
	providers: [AuthenticationService,StudentService],
})
export class AppComponent implements OnInit,OnDestroy {
	private _activatedUrl: string;
	private _sideDrawerTransition: DrawerTransitionBase;
	public name:any;
	public connectionType: string;
	constructor(private router: Router,
		private activeRoute: ActivatedRoute,
		private zone: NgZone,
		private routerExtensions: RouterExtensions,
		private authenticationService: AuthenticationService,
		private messageService: MessageService,
		private studentService: StudentService) {
		if (localStorage.getItem('currentUser')) {
			this.router.navigate(['/home']);
		} else {
			this.router.navigate(['/login']);
		}
		this.connectionType = "unknown";
	}

	ngOnInit(): void {
		this._activatedUrl = "/home";
		this._sideDrawerTransition = new SlideInOnTopTransition();

		this.router.events
		.pipe(filter((event: any) => event instanceof NavigationEnd))
		.subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);
		this.getUserDetail();
		this.connectionType = this.connectionToString(Connectivity.getConnectionType());
		Connectivity.startMonitoring(connectionType => {
			this.zone.run(() => {
				this.connectionType = this.connectionToString(connectionType);
				if(this.connectionType=='mobile' || this.connectionType=='wifi'){
				}
				else{
					setTimeout(()=>{
						this.messageService.onErrorMessage('Please check your Internet connection!');
					},400)
				}
			});
		});
	}

	public connectionToString(connectionType: number): string {
		switch (connectionType) {
			case Connectivity.connectionType.none:
			return "no";
			case Connectivity.connectionType.wifi:
			return "wifi";
			case Connectivity.connectionType.mobile:
			return "mobile";
			default:
			return "unknown";
		}
	}

	get sideDrawerTransition(): DrawerTransitionBase {
		return this._sideDrawerTransition;
	}

	isComponentSelected(url: string): boolean {
		return this._activatedUrl === url;
	}

	onNavItemTap(navItemRoute: string): void {
		this.routerExtensions.navigate([navItemRoute], {
			transition: {
				name: "fade"
			}
		});

		const sideDrawer = <RadSideDrawer>app.getRootView();
		sideDrawer.closeDrawer();
	}


	// Get user detail on basis of userId
	getUserDetail(){
		this.studentService.getStudentInfo('student_info_q2').subscribe(response=>{
		
			if(response['data']){
					this.name=response['data'].name;
					console.log(this.name);
				}
			}, (error:any)=> {
				this.messageService.onError(error);
			});
	}
	

	openProfile(){
		this.routerExtensions.navigate(['/profile']);
	}

	onLogout(){
		this.authenticationService.logout();
		const sideDrawer = <RadSideDrawer>app.getRootView();
		sideDrawer.closeDrawer();
	}


			ngOnDestroy() {
				// >> connectivity-stop-code 
				Connectivity.stopMonitoring();
				// << connectivity-stop-code
		}

}