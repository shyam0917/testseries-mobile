import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewChild } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page";
import { CourseService } from './../services/course.service';
import { MessageService } from './../services/message.service';
import { AndroidApplication, AndroidActivityBackPressedEventData } from "tns-core-modules/application";
import { filter } from "rxjs/operators";
import * as UtilsModule from "tns-core-modules/utils/utils";
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
	public mappedData=[];
	errorMessage:string="";

	constructor(
		private page:Page,
		private route: ActivatedRoute,
		private courseService: CourseService,
		private messageService: MessageService,
		private routerExtensions: RouterExtensions) {
		// app.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {

			// });
			this.route.queryParams.subscribe(params => {
				if(params.demoId){
					this.id=JSON.parse(params.demoId);
					this.title=JSON.parse(params.demoName);
				}
			});
		}

		ngOnInit() {
			this.getCourseById(this.id);
		}

		goBack(){
			this.routerExtensions.backToPreviousPage();
		}

		getCourseById(id){
			this.isLoading=true;
			this.courseService.getCoursesById(id).subscribe(response=>{
				if(response['data']){
					this.isLoading=false;
					this.courses=response['data'][0];
					this.videoData=this.courses.Videos;
					this.mappedData=this.videoData.filter(course=>course['videoType']=='demo');
				}
			},error=>{
				this.isLoading=false;
				this.errorMessage=error.json().msg;
				this.messageService.onError(this.errorMessage);
			}
			)
		}

		openPlayer(videoId:any){
			let params = {
				videoId: JSON.stringify(videoId),
				showDemo:"true"
			}
			this.routerExtensions.navigate(['/post'], {
				queryParams: params,
			});
		}

		buyCourse(){
			this.isLoading=true;
			this.courseService.getPayment(this.courses).subscribe(response=>{
				this.isLoading=false;
				if(response['data']){
					let url = response['data'];
					UtilsModule.openUrl(url); 
				}
			},error=>{
				this.errorMessage=error.error.msg;
				this.isLoading=false;
				this.messageService.onErrorMessage(this.errorMessage);
			}
			)
		}

		showPreview(){
			let params = {
				courseId: JSON.stringify(this.courses._id)
			}
			this.routerExtensions.navigate(['/preview'], {
				queryParams: params,
			});
		}


	}
