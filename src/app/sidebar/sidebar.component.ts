import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewChild } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { filter } from "rxjs/operators";
import frameModule = require("ui/frame");
import * as app from "tns-core-modules/application";

@Component({
	selector: "Sidebar",
	moduleId: module.id,
	templateUrl: "./sidebar.component.html"
})

export class SidebarComponent implements OnInit,AfterViewInit {
	// private _activatedUrl: string;
	// private _sideDrawerTransition: DrawerTransitionBase;
	private _mainContentText: string;

	constructor(private router: Router,
		private _changeDetectionRef: ChangeDetectorRef,
		private routerExtensions: RouterExtensions) {
	}

	// @ViewChild(RadSideDrawerComponent) 
	// public drawerComponent: RadSideDrawerComponent;
	// private drawer: RadSideDrawer;

	ngAfterViewInit() {
		// this.drawer = this.drawerComponent.sideDrawer;
		// this._changeDetectionRef.detectChanges();
	}

	ngOnInit() {
		// this.mainContentText = "SideDrawer for NativeScript can be easily setup in the HTML definition of your page by defining tkDrawerContent and tkMainContent. The component has a default transition and position and also exposes notifications related to changes in its state. Swipe from left to open side drawer.";
	}

	// get mainContentText() {
	// 	return this._mainContentText;
	// }

	// set mainContentText(value: string) {
	// 	this._mainContentText = value;
	// }

	// public openDrawer() {
	// 	this.drawer.showDrawer();
	// }
	// public onCloseDrawerTap() {
	// 	this.drawer.closeDrawer();
	// }

	// ngOnInit(): void {
		// 	this._activatedUrl = "/home";
		// 	this._sideDrawerTransition = new SlideInOnTopTransition();

		// 	this.router.events
		// 	.pipe(filter((event: any) => event instanceof NavigationEnd))
		// 	.subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);
		// }

		// get sideDrawerTransition(): DrawerTransitionBase {
			// 	return this._sideDrawerTransition;
			// }

			// isComponentSelected(url: string): boolean {
				// 	return this._activatedUrl === url;
				// }

				// onNavItemTap(navItemRoute: string): void {
					// 	this.routerExtensions.navigate([navItemRoute], {
						// 		transition: {
							// 			name: "fade"
							// 		}
							// 	});

							// onDrawerButtonTap(): void {
								// const sideDrawer = <RadSideDrawer>(frameModule.topmost().getViewById("sideDrawer"));
								// sideDrawer.closeDrawer();
								// }


								// }
							}
