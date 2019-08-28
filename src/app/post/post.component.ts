import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from "@angular/core";
import { registerElement } from "nativescript-angular/element-registry";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page";
declare var android:any;
import { DeviceOrientation } from "ui/enums";
import { Subscription } from 'rxjs';
import { GridLayout } from "ui/layouts/grid-layout";
import {screen, isIOS, isAndroid} from "tns-core-modules/platform/platform";
import {OrientationChangedEventData} from "tns-core-modules/application"
import { AndroidApplication, AndroidActivityBackPressedEventData } from "tns-core-modules/application";
import { setCurrentOrientation, orientationCleanup } from 'nativescript-screen-orientation';
import { Video } from 'nativescript-videoplayer';
registerElement("VideoPlayer", () => Video);
var youtubeParser = require('nativescript-youtube-parser');

import * as app from "tns-core-modules/application";


@Component({
	selector: "Home",
	moduleId: module.id,
	templateUrl: "./post.component.html"
})

export class PostComponent implements OnInit,OnDestroy {
	public isLoading:boolean=false;
	public showFullscreen:boolean=false;
	public vr:string;
	public videoId:string;
	subscription: Subscription;
	public showDemo:boolean=false;
	public setRows="260,auto,auto,auto";
	@ViewChild("grid") ref : ElementRef;
	public Info = {
		comment: "",
	};

	constructor(private route: ActivatedRoute,
		private routerExtensions: RouterExtensions,
		private page: Page,
		private router: Router){
		this.route.queryParams.subscribe(params => {
			this.videoId=JSON.parse(params.videoId);
			this.showDemo=JSON.parse(params.showDemo);
		});
	}


	ngOnInit(){
		this.isLoading=true;
		this.page.actionBarHidden = true;
		setCurrentOrientation("portrait", function () {
		});
		let url='https://www.youtube.com/watch?v=' + this.videoId;
		youtubeParser.getURL(url, { quality: 'small', container: 'mp4' })
		.then((urlList)=> {
			this.vr=urlList[0].url;
		}
		);
		app.android.startActivity.getWindow().setFlags(
			android.view.WindowManager.LayoutParams.FLAG_SECURE,
			android.view.WindowManager.LayoutParams.FLAG_SECURE
			);

	}

	displayComment(com:any){
		console.log(com.comment);
	}

	//  on32OrientationChanged = (args: app.OrientationChangedEventData) => {
		//     if(args.newValue==DeviceOrientation.landscape){
			//      this.setRows="260,auto,auto,auto";
			//      console.log(this.setRows);
			//     }
			// };

			goBack(){
				this.showFullscreen=false;
				this.setRows="260,auto,auto,auto";
				setCurrentOrientation("portrait", function () {
				});
			}

			setFullscreen(){
				this.showFullscreen=true;
				// this.page.getViewById("someId").rows="100, *,60"; 
				let height = Math.floor(screen.mainScreen.widthPixels*9/16);
				this.setRows=height + ",auto,auto,auto";
				console.log(this.setRows);
				// page.getViewById("someId").requestLayout();
				setCurrentOrientation("landscape", function () {
				});
			}

			callonReady(){
				this.isLoading=false;
			}


			ngOnDestroy() {
				orientationCleanup();
			}
		}