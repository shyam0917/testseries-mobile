import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { getRootView } from "tns-core-modules/application";
import { WebView, LoadEventData } from "tns-core-modules/ui/web-view";
import { RouterExtensions } from "nativescript-angular/router";

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
export class HomeComponent implements OnInit,AfterViewInit,OnDestroy {
	@ViewChild('webView') webView: ElementRef;
	// 	 public player:any;
	// public oWebViewInterface:any;
	private drawer: RadSideDrawer;
	public name:any;	

	public showFullscreen:boolean=false;
	public Info = {
		comment: "",
	};
	public comment:any;
	public course=[
	{
		name: "Shyam",
		message: "hello"
	},
	{
		name: "Shyam",
		message: "hello"
	},
	{
		name: "Shyam",
		message: "welcome"
	}
	]

	constructor(private page: Page,
		private routerExtensions: RouterExtensions) {
		setCurrentOrientation("portrait", function () {
		});
	}

	ngOnInit(): void {
		this.page.actionBarHidden = true;

		// Init your component properties here.
	}

	ngAfterViewInit() {
		// use setTimeout otherwise there is no getRootView valid reference
		setTimeout(() => {
			this.drawer = <RadSideDrawer>getRootView();
			this.drawer.gesturesEnabled = true;
			this.name="Adiya";
		}, 100);
		let webview: WebView = this.webView.nativeElement;
		webview.on(WebView.loadStartedEvent, function (args: LoadEventData) {
			webview.android.getSettings().setBuiltInZoomControls(false);
			webview.android.getSettings().setJavaScriptEnabled(true);
			webview.android.getSettings().setMediaPlaybackRequiresUserGesture(false);
		});
	}

	goBack(){
		this.showFullscreen=false;
		setCurrentOrientation("portrait", function () {
		});
	}

	setFullscreen(){
		this.showFullscreen=true;
		console.log(this.showFullscreen);
		setCurrentOrientation("landscape", function () {
		});
	}

	displayComment(com:any){
		console.log(com.comment);
	}

	ngOnDestroy() {
	orientationCleanup();
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