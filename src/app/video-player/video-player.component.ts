import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from "@angular/core";
import { WebView, LoadEventData } from "tns-core-modules/ui/web-view";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";
import { MessageService } from './../services/message.service';
import {screen, isIOS, isAndroid} from "tns-core-modules/platform/platform";
import { CourseService } from './../services/course.service';
import { setCurrentOrientation, orientationCleanup } from 'nativescript-screen-orientation';
import * as app from "tns-core-modules/application";
declare var android:any;
var webViewInterfaceModule = require('nativescript-webview-interface');
import frameModule = require("ui/frame");

@Component({
	selector: "VideoPlayer",
	moduleId: module.id,
	templateUrl: "./video-player.component.html"
})
export class VideoPlayerComponent implements OnInit,AfterViewInit,OnDestroy {
	public isLoading:boolean=false;
	public vr:string;
	public videoId:string;
	public videoUrl:any;
	public errorMessage:string="";
	// @ViewChild('webView') webView: ElementRef;
	public name:any;	
	public setRows="276,auto,auto,*";
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

	constructor(private courseService: CourseService,
		private route: ActivatedRoute,
		private page: Page,
		private messageService: MessageService) { 
		this.route.queryParams.subscribe(params => {
			this.videoId=JSON.parse(params.videoId);
		});
	}

	ngOnInit() {
		console.log(this.showFullscreen);
		this.page.actionBarHidden = true;
		// this.videoUrl="https://www.dailymotion.com/embed/video/"+this.videoId+"?queue-enable=false&&sharing-enable=false&&autoplay=1&&ui-logo=false";
		// console.log(this.videoUrl);
		// this.isLoading=true;
		setCurrentOrientation("portrait", function () {
		});
		app.android.startActivity.getWindow().setFlags(
			android.view.WindowManager.LayoutParams.FLAG_SECURE,
			android.view.WindowManager.LayoutParams.FLAG_SECURE
			);

	}

	  // public onLoadStarted(args: LoadEventData) {
   //      let message;
   //      if (!args.error) {
   //          message = "WebView started loading of " + args.url;
   //      } else {
   //          message = "Error loading " + args.url + ": " + args.error;
   //      }
   //      console.log(message);
   //  }
   //  public onLoadFinished(args: LoadEventData) {
   //      let message;
   //      if (!args.error) {
   //          message = "WebView finished loading of " + args.url;
   //      } else {
   //          message = "Error loading " + args.url + ": " + args.error;
   //      }
   //      console.log(message);
   //  }



	ngAfterViewInit() {
		// use setTimeout otherwise there is no getRootView valid reference
		// let webview: WebView = this.webView.nativeElement;
		// webview.on(WebView.loadStartedEvent, function (args: LoadEventData) {
			// 	webview.android.getSettings().setBuiltInZoomControls(false);
			// 	webview.android.getSettings().setJavaScriptEnabled(true);
			// 	webview.android.getSettings().setMediaPlaybackRequiresUserGesture(false);
			// 	this.isLoading=false;
			// });
		}

		goBack(){
			this.showFullscreen=false;
			this.setRows="276,auto,auto,*";
			setCurrentOrientation("portrait", function () {
			});
		}

		setFullscreen(){
			this.showFullscreen=true;
			let height = Math.floor(screen.mainScreen.widthPixels*9/16);
			this.setRows=height + ",auto,auto,auto";
			console.log(this.setRows);
			setCurrentOrientation("landscape", function () {
			});
		}

		displayComment(com:any){
			console.log(com.comment);
		}



		ngOnDestroy() {
			orientationCleanup();
		}


	}