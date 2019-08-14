import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { MessageConfig } from './../config/message-config.constants';
import { CommonConfig } from './../config/common-config.constants';
import { AuthenticationService } from './../services/authentication.service';
import { RouterExtensions } from "nativescript-angular/router";
import { MessageService } from './../services/message.service';
import { CourseService } from './../services/course.service';
import * as UtilsModule from "tns-core-modules/utils/utils";
import * as app from "tns-core-modules/application";

@Component({
	selector: "Search",
	moduleId: module.id,
	templateUrl: "./videoClasses.component.html"
})
export class VideoClassesComponent implements OnInit {
	public role: string="";
	public cardPath: string= new CommonConfig().CARD_PATH;
	public urlPrefix: string="";
	selectedStatus:any=[];
	contentStatus: any=[];
	courseData:any=[];
	selectedStatusArry: any=[];
	courses:any=[];
	public dataArr: any;
	public isLoading:boolean=false;
	public totalItems: number = 0;
	errorMessage: string;
	successMessage: string;
	courseDetails:any={};
	addCourseObject:any={};
	subSubjectName:string='';
	newSubjectName:string='';
	public subsubjectArray: any=[];

	constructor( private authenticationService: AuthenticationService,
		private courseService: CourseService,
		private routerExtensions: RouterExtensions,
		private messageService: MessageService) {
		// Use the component constructor to inject providers.
	}

	ngOnInit(): void {
		this.role=this.authenticationService.userRole;
		this.contentStatus=CommonConfig.STATUS_CONTENT.slice(0,3).map(s=> {return {id: s,itemName: s}})
		this.selectedStatusArry=[this.contentStatus[0]];
		this.getCoursesByFilter();
	}

	 onDrawerButtonTap(): void {
		const sideDrawer = <RadSideDrawer>app.getRootView();
		sideDrawer.showDrawer();
	}

			// to get all courses from collections -
	getCoursesByFilter(){
		let filter={};
		if(this.selectedStatusArry.length){
			filter['status']=this.selectedStatusArry.map(s=>s.id);
		}
		  filter['platform']="VideoCourses"
		  filter['view']="released"
		this.getAllCourses(filter);
	}

		//To get all Active course -
	getAllCourses(filter: any={}){
		this.isLoading=true;
		this.courseService.getAllCourses(filter).subscribe(response=>{
			this.isLoading=false;
			if(response['data']){
				this.courses=response['data'];
				this.courses=this.courses.filter((item)=>{
					if(item.platform==="VideoCourses" && item.view==="released" && item.status=="Active"){
						return item;
					}
				})
				console.log(JSON.stringify(this.courses));
			}
		},error=>{
			this.errorMessage=error.json().msg;
			this.messageService.onError(this.errorMessage);
		}
		)
	}

			// getting payment from user -
	setPayment(payDetails){
		this.isLoading=true;
		this.courseService.getPayment(payDetails).subscribe(response=>{
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

		showPreview(Id){
		let params = {
			 courseId: JSON.stringify(Id)
		}
		this.routerExtensions.navigate(['/preview'], {
			queryParams: params,
		});
	}
}
