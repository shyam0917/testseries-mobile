import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import frameModule = require("ui/frame");

@Component({
	selector: "Profile",
	moduleId: module.id,
	templateUrl: "./profile.component.html"
})
export class ProfileComponent implements OnInit {

	constructor() {
		// Use the component constructor to inject providers.
	}

	ngOnInit(): void {
this.onHideDrawer();
	}

	onHideDrawer(){
		const sideDrawer = <RadSideDrawer>app.getRootView();
		sideDrawer.closeDrawer();
	}

	onDrawerButtonTap(): void {
		const sideDrawer = <RadSideDrawer>app.getRootView();
		sideDrawer.showDrawer();
	}

}