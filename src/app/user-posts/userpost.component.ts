import { Component, OnInit, ElementRef, ViewChild, OnDestroy, ViewContainerRef } from "@angular/core";
import { registerElement } from "nativescript-angular/element-registry";
import { ActivatedRoute, Router } from "@angular/router";
import { StudentService } from './../services/student.service';
import { MessageService } from './../services/message.service';
import * as dialogs from "tns-core-modules/ui/dialogs";
import { CommonConfig } from '../config/common-config.constants';
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { RouterExtensions } from "nativescript-angular/router";
import * as UtilsModule from "tns-core-modules/utils/utils";
import * as app from "tns-core-modules/application";


@Component({
	selector: "UserPost",
	moduleId: module.id,
	templateUrl: "./userpost.component.html",
	providers:[StudentService]
})

export class UserPostComponent implements OnInit {
	public isLoading:boolean=false;
	public role: string="";
	public urlPrefix: string="";
	selectedStatus:any=[];
	contentStatus: any=[];
	selectedStatusArry: any=[];
	posts:any=[];
	public dataArr: any;
	public totalItems: number = 0;
	public postImg:string="res://courseimg";
	errorMessage: string;
	successMessage: string;
    courseImgPath:string=new CommonConfig().Aws_URL+'posts/';
	postDetails:any={};

	constructor(private route: ActivatedRoute,
		private routerExtensions: RouterExtensions,
		private studentService: StudentService, 
		private messageService: MessageService,
		private router: Router){

	}
	ngOnInit(){
		this.getPostByFilter();
	}

	// to get all released posts from collections -
	getPostByFilter(){
		let filter={};
		if(this.selectedStatusArry.length){
			filter['status']=this.selectedStatusArry.map(s=>s.id);
		}
		filter['view']="released"
		this.getAllPosts(filter);
	}

	//To get all Active post -
	getAllPosts(filter: any){
		this.isLoading=true;
		this.studentService.getAllPosts(filter).subscribe(response=>{
			this.isLoading=false;
			if(response['data']){
				this.posts=response['data'];
				this.posts=this.posts.filter((item)=>{
					if(item.view==="released"){
						return item;
					}
				})

			}
		},error=>{
			this.isLoading=false;
			this.errorMessage=error.error.msg;
			this.messageService.onErrorMessage(this.errorMessage);
		}
		)
	}

	openModal(postData:any){
		dialogs.alert({
			title: postData.title,
			message: postData.description,
			okButtonText: "OK"
		}).then(() => {
		});
	}

	onDrawerButtonTap(): void {
		const sideDrawer = <RadSideDrawer>app.getRootView();
		sideDrawer.showDrawer();
	}

	openLink(urlData:any){
UtilsModule.openUrl(urlData); 
			}
	}

