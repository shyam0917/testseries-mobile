import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { RouterExtensions } from "nativescript-angular/router";
import { MessageService } from './../services/message.service';
import { DeviceOrientation } from "ui/enums";
import { CourseService } from './../services/course.service';
import {OrientationChangedEventData} from "tns-core-modules/application"
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
	rowHeight:number=190;
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
		 // app.on(app.orientationChangedEvent, this.onOrientationChanged);
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

    //  onOrientationChanged = (args: app.OrientationChangedEventData) => {
    //     if(args.newValue==DeviceOrientation.landscape){
    //      this.rowHeight=400;
    //      console.log(this.rowHeight);
    //     }
    // };


				//To get all assign course -
				getAssignCourse(){
					this.isLoading=true;
					this.courseService.getAssignCourse().subscribe(response=>{
						this.isLoading=false;
						if(response['data']){
							 this.courses=response['data'];
							this.dataArr=response['data'];
							this.totalItems=response['data'].length;
						}
					},error=>{
			this.errorMessage=error.error.msg;
			this.messageService.onErrorMessage(this.errorMessage);
					}
					)
				}

			}
