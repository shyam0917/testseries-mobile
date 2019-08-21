import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewChild } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { setCurrentOrientation, orientationCleanup } from 'nativescript-screen-orientation';
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


	constructor(private router: Router,
		private page:Page,
		private routerExtensions: RouterExtensions) {
		this.page.actionBarHidden = true;
	}


	ngAfterViewInit() {

	}

	ngOnInit() {
		setCurrentOrientation("landscape", function () {
		});
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
