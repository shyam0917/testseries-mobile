import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from "@angular/core";
import { registerElement } from "nativescript-angular/element-registry";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page";
declare var android:any;
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
	public vr:string;
	public videoId:string;

	constructor(private route: ActivatedRoute,
		private routerExtensions: RouterExtensions,
		private page: Page,
		private router: Router){

	this.route.queryParams.subscribe(params => {
			this.videoId=JSON.parse(params.videoId);
		});

		// 	setCurrentOrientation("landscape", function () {
		// });
	}
	ngOnInit(){
		this.isLoading=true;
		this.page.actionBarHidden = true;
		let url='https://www.youtube.com/watch?v=' + this.videoId;
		console.log(url);
		youtubeParser.getURL(url, { quality: 'small', container: 'mp4' })
		.then((urlList)=> {
			console.log("YouTube mp4 video url: ", urlList[0].url);
			this.vr=urlList[0].url;
		}
		);
		app.android.startActivity.getWindow().setFlags(
			android.view.WindowManager.LayoutParams.FLAG_SECURE,
			android.view.WindowManager.LayoutParams.FLAG_SECURE
			);

	}



		callonReady(){
		this.isLoading=false;
	}


	ngOnDestroy() {
		orientationCleanup();
	}
}