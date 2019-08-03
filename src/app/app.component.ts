import { Component, OnInit, ViewChild } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
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
export class AppComponent implements OnInit {
	private _activatedUrl: string;
	private _sideDrawerTransition: DrawerTransitionBase;
  public name:any;

	constructor(private router: Router,
		private routerExtensions: RouterExtensions,
		private authenticationService: AuthenticationService,
		private messageService: MessageService,
		private studentService: StudentService) {
		if (localStorage.getItem('currentUser')) {
			this.router.navigate(['/home']);
		} else {
			this.router.navigate(['/login']);
		}
	}

	ngOnInit(): void {
		this._activatedUrl = "/home";
		this._sideDrawerTransition = new SlideInOnTopTransition();

		this.router.events
		.pipe(filter((event: any) => event instanceof NavigationEnd))
		.subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);
		this.getUserDetail();
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
				this.name=response['data'].name;
				// if(response.data){
				// 	this.userData=response.data;
				// }
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

}