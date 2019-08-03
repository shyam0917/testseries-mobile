import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { RouterExtensions } from "nativescript-angular/router";
import * as app from "tns-core-modules/application";

@Component({
	selector: 'ns-playlist',
	templateUrl: './playlist.component.html',
	styleUrls: ['./playlist.component.css'],
	moduleId: module.id,
})
export class PlaylistComponent implements OnInit {
public courseData:any=[];
public title:any=String;

	constructor(private route: ActivatedRoute,
		private routerExtensions: RouterExtensions) { 
	
	this.route.queryParams.subscribe(params => {
			this.courseData=JSON.parse(params.videoData);
	     this.title=JSON.parse(params.title);
		});

	}

	ngOnInit() {

	}

		onDrawerButtonTap(): void {
		const sideDrawer = <RadSideDrawer>app.getRootView();
		sideDrawer.showDrawer();
	}

	openPlayer(videoId:any){
this.routerExtensions.navigate(['/videoPlayer']);
	}

}
