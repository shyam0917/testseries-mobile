import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { MessageConfig } from './../config/message-config.constants';
import { CommonConfig } from './../config/common-config.constants';
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { MessageService } from './../services/message.service';
import { CourseService } from './../services/course.service';
import * as app from "tns-core-modules/application";

@Component({
	selector: "LiveList",
	moduleId: module.id,
	templateUrl: "./livelist.component.html",
})

export class LiveListComponent implements OnInit {
	courses:any=[];
	public dataArr: any;
	isLoading:boolean=false;
	errorMessage: string;
	successMessage: string;
	title:string="";
	id:any="";
	public videoData:any=[];
	courseDetails:any={};

	constructor(private courseService: CourseService,
		private route: ActivatedRoute,
		private routerExtensions: RouterExtensions,
		private messageService: MessageService) {
		this.route.queryParams.subscribe(params => {
			if(params.courseId){
				console.log(params);
				this.id=JSON.parse(params.courseId);
				this.title=JSON.parse(params.courseName);
			}
		});
	}

	ngOnInit(){
	this.getCourseById(this.id);
	}

		goBack(){
		this.routerExtensions.backToPreviousPage();
	}

		getCourseById(id){
		this.isLoading=true;
		this.courseService.getCoursesById(id).subscribe(response=>{
			this.isLoading=false;
			if(response['data']){
				this.courses=response['data'][0];
				this.videoData=this.courses.Videos;
			}
		},error=>{
			this.errorMessage=error.json().msg;
			this.messageService.onError(this.errorMessage);
		}
		)
	}

	openPlayer(videoId){
		let params = {
			 videoId: JSON.stringify(videoId)
		}
		this.routerExtensions.navigate(['/videoPlayer'], {
			queryParams: params,
		});
	}


}
