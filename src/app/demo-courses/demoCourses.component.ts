import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewChild } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page";
import { CourseService } from './../services/course.service';
import { MessageService } from './../services/message.service';
import { filter } from "rxjs/operators";
import * as app from "tns-core-modules/application";

@Component({
	selector: "Demo",
	moduleId: module.id,
	templateUrl: "./demoCourses.component.html",
	providers:[CourseService]
})

export class DemoCoursesComponent implements OnInit {
	id:any;
	title:any;
	isLoading:boolean=false;
	public courses:any={};
	public videoData:any=[];
	errorMessage:string="";

	constructor(
		private page:Page,
		private route: ActivatedRoute,
		private courseService: CourseService,
		private messageService: MessageService,
		private routerExtensions: RouterExtensions) {
		this.route.queryParams.subscribe(params => {
			this.id=JSON.parse(params.demoId);
			this.title=JSON.parse(params.demoName);
		});
	}

	ngOnInit() {
		this.getCourseById(this.id);
	}

	goBack(){
		// this.routerExtensions.
	}

	getCourseById(id){
		this.isLoading=true;
		this.courseService.getCoursesById(id).subscribe(response=>{
			this.isLoading=false;
			if(response['data']){
				this.courses=response['data'][0];
        this.videoData=this.courses.Videos;
				console.log(JSON.stringify(this.courses.Videos));
			}
		},error=>{
			this.errorMessage=error.json().msg;
			this.messageService.onError(this.errorMessage);
		}
		)
	}

	
}
