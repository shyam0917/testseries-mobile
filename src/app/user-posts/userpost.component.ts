import { Component, OnInit, ElementRef, ViewChild, OnDestroy, ViewContainerRef } from "@angular/core";
import { registerElement } from "nativescript-angular/element-registry";
import { ActivatedRoute, Router } from "@angular/router";
import { StudentService } from './../services/student.service';
import { MessageService } from './../services/message.service';
import * as dialogs from "tns-core-modules/ui/dialogs";
// import { ModalComponent } from './../modal/modal.component';
// import { ModalDialogService, ModalDialogOptions } from "nativesdirectives/dialogs";
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
	errorMessage: string;
	successMessage: string;
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
		console.log(filter);
		this.studentService.getAllPosts(filter).subscribe(response=>{
			this.isLoading=false;
			if(response['data']){
				this.posts=response['data'];
				this.posts=this.posts.filter((item)=>{
					if(item.view==="released"){
						return item;
					}
				})
				console.log(JSON.stringify(this.posts));
			}
		},error=>{
			this.errorMessage=error.msg;
			this.messageService.onError(this.errorMessage);
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

