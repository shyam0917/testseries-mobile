import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { getRootView } from "tns-core-modules/application";
import { WebView, LoadEventData } from "tns-core-modules/ui/web-view";
import { Page } from "tns-core-modules/ui/page";
import { setCurrentOrientation, orientationCleanup } from 'nativescript-screen-orientation';
import * as app from "tns-core-modules/application";
var webViewInterfaceModule = require('nativescript-webview-interface');
import frameModule = require("ui/frame");

@Component({
	selector: "Home",
	moduleId: module.id,
	templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit,AfterViewInit {
// 	 @ViewChild('webView') webView: ElementRef;
// 	 public player:any;
// public oWebViewInterface:any;
private drawer: RadSideDrawer;
public name:any;	
	constructor(private page: Page) {
			setCurrentOrientation("landscape", function () {
		});
	}

	ngOnInit(): void {
		this.page.actionBarHidden = true;
		    // this.setupWebViewInterface();
		// Init your component properties here.
	}

    ngAfterViewInit() {
        // use setTimeout otherwise there is no getRootView valid reference
        setTimeout(() => {
            this.drawer = <RadSideDrawer>getRootView();
            this.drawer.gesturesEnabled = true;
            this.name="Adiya";
        }, 100);
    }

	onDrawerButtonTap(): void {
		const sideDrawer = <RadSideDrawer>app.getRootView();
		sideDrawer.showDrawer();
	}

	// play(){
 //  this.oWebViewInterface.callJSFunction('playVideo');
	// }

	// setupWebViewInterface(){
	// 	    let webView: WebView = this.webView.nativeElement;

 //    this.oWebViewInterface = new webViewInterfaceModule.WebViewInterface(webView, this.webViewSrc);
	// }

}