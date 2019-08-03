import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { RouterExtensions } from "nativescript-angular/router";
import { MessageService } from './../services/message.service';
import { CourseService } from './../services/course.service';
import * as app from "tns-core-modules/application";

@Component({
	selector: "MyCourses",
	moduleId: module.id,
	templateUrl: "./myCourses.component.html"
})
export class MyCoursesComponent implements OnInit {
  public role: string="";
	selectedStatus:any=[];
	contentStatus: any=[];
	selectedStatusArry: any=[];
	courses:any=[];
	public dataArr: any;
	public totalItems: number = 0;
	errorMessage: string;
	successMessage: string;
	isLoading:boolean=false;
	courseDetails:any={};
	addCourseObject:any={};
	subSubjectName:string='';
	newSubjectName:string='';
	public subsubjectArray: any=[];

	constructor(private courseService: CourseService,
		private messageService: MessageService,
		private routerExtensions: RouterExtensions) {
		// Use the component constructor to inject providers.
	}

	ngOnInit(): void {
			this.getAssignCourse();
	}

		onDrawerButtonTap(): void {
		const sideDrawer = <RadSideDrawer>app.getRootView();
		sideDrawer.showDrawer();
	}

// go to playlist component 
gotoPlaylist(playlistData: any, title:any){
		let params = {
			videoData: JSON.stringify(playlistData),
			title: JSON.stringify(title)
		}
		this.routerExtensions.navigate(['/playlist'], {
			queryParams: params,
		});
}



	  	//To get all assign course -
	getAssignCourse(){
		this.isLoading=true;
		this.courseService.getAssignCourse().subscribe(response=>{
			this.isLoading=false;
			if(response['data']){
				this.courses=response['data'];
				this.dataArr=response['data'];;
				this.totalItems=response['data'].length;
			}
		},error=>{
			this.errorMessage=error.msg;
			this.messageService.onError(this.errorMessage);
		}
		)
	}

}
