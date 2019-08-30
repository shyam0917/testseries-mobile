import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
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
	public courseData:[]=[];
	public mappedData=[];
	public title:any=String;
	public showPlaylist:boolean=true;

	constructor(private route: ActivatedRoute,
		private routerExtensions: RouterExtensions,
		private router: Router) { 
		this.route.queryParams.subscribe(params => {
			if(params.videoData){
				this.courseData=JSON.parse(params.videoData);
				this.title=JSON.parse(params.title);
			}
		});

	}

	ngOnInit(){
	this.mappedData=this.courseData.filter(course=>course['videoType']=='paid')
	}


	goBack(){
		this.routerExtensions.navigate(['/myCourses'],{ clearHistory: true });
	}

	openPlayer(videoId:any){
		let params = {
			videoId: JSON.stringify(videoId),
			showDemo:"false"
		}
		this.routerExtensions.navigate(['/post'], {
			queryParams: params,
		});

	}

}
