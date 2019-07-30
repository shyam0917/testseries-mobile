import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { filter } from "rxjs/operators";
import frameModule = require("ui/frame");
import * as app from "tns-core-modules/application";

@Component({
	selector: "Sidebar",
	moduleId: module.id,
	templateUrl: "./sidebar.component.html"
})
export class SidebarComponent implements OnInit {
	private _activatedUrl: string;
	private _sideDrawerTransition: DrawerTransitionBase;

	constructor(private router: Router, private routerExtensions: RouterExtensions) {
		// Use the component constructor to inject providers.
	}

	ngOnInit(): void {
		this._activatedUrl = "/home";
		this._sideDrawerTransition = new SlideInOnTopTransition();

		this.router.events
		.pipe(filter((event: any) => event instanceof NavigationEnd))
		.subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);
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

		// onDrawerButtonTap(): void {
		// 	const sideDrawer = <RadSideDrawer>app.getRootView();
		// 	sideDrawer.showDrawer();
		// }

		const sideDrawer = <RadSideDrawer>(frameModule.topmost().getViewById("sideDrawer"));
		sideDrawer.closeDrawer();
	}
}
