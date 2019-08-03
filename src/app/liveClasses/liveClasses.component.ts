import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { MessageConfig } from './../config/message-config.constants';
import { CommonConfig } from './../config/common-config.constants';
import { AuthenticationService } from './../services/authentication.service';
import { MessageService } from './../services/message.service';
import { CourseService } from './../services/course.service';
import * as app from "tns-core-modules/application";

@Component({
	selector: "LiveClasses",
	moduleId: module.id,
	templateUrl: "./liveClasses.component.html"
})
export class LiveClassesComponent implements OnInit {
  public role: string="";
	public urlPrefix: string="";
	selectedStatus:any=[];
	contentStatus: any=[];
	selectedStatusArry: any=[];
	courses:any=[];
	public dataArr: any;
	isLoading:boolean=false;
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
		private messageService: MessageService) {
		// Use the component constructor to inject providers.
	}

	ngOnInit(): void {
		this.role=this.authenticationService.userRole;
		this.contentStatus=CommonConfig.STATUS_CONTENT.slice(0,3).map(s=> {return {id: s,itemName: s}})
		this.selectedStatusArry=[this.contentStatus[0]];
		this.getCoursesByFilter();
	}

		// to get add courses from collections -
	getCoursesByFilter(){
		let filter={};
		if(this.selectedStatusArry.length){
			filter['status']=this.selectedStatusArry.map(s=>s.id);
		}
		  filter['platform']="LiveClasses"
		  filter['view']="released"
		this.getAllCourses(filter);
	}

//To get all Active course -
	getAllCourses(filter: any={}){
		this.messageService.showLoader.emit(true);
		this.courseService.getAllCourses(filter).subscribe(response=>{
			this.messageService.showLoader.emit(false);
			if(response['data']){
				this.courses=response['data'];
				console.log(JSON.stringify(this.courses));
				this.dataArr=response['data'];
				this.totalItems=response['data'].length;
			}
		},error=>{
			this.errorMessage=error.msg;
			this.messageService.onError(this.errorMessage);
		}
		)
	}

	//To getting course details by id 
	getCourseDetails(id:string){
		this.courseDetails=this.courses.find(ele=>ele._id === id);
	}

	onDrawerButtonTap(): void {
		const sideDrawer = <RadSideDrawer>app.getRootView();
		sideDrawer.showDrawer();
	}
}
