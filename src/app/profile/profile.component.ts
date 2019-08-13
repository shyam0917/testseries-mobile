import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { TabView } from "tns-core-modules/ui/tab-view";
import { ValidationConfig } from "../config/validation-config.constants";
import { TextField } from 'ui/text-field'; 
import { StudentService } from '../services/student.service';
import { MessageService } from '../services/message.service';
import { RouterExtensions } from "nativescript-angular/router";
import frameModule = require("ui/frame");

@Component({
	selector: "Profile",
	moduleId: module.id,
	templateUrl: "./profile.component.html"
})
export class ProfileComponent implements OnInit {
	public passwordInfo={
		oldPassword:'',
		newPassword:'',
		confirmNewPassword:''
	}
	public personalInfo={
		name:'',
		email:'',
		mobile:''
	}
	public addressInfo={
		state:'',
		country:'',
		city:'',
		pincode:'',
		address:''
	}
	successMessage:string;
	errorMessage:string;
	isLoading:boolean=false;
	public userData: any = {} ;
	public showPassword:boolean=false;
	public newPass:string="";
	public confirmPass:string="";
	public matchpass:boolean=false;
	public passwordpattern=ValidationConfig.PASSWORD_PATTERN;


	constructor(private routerExtensions: RouterExtensions,
		private studentService: StudentService,
		private messageService: MessageService) {
		// Use the component constructor to inject providers.
	}

	ngOnInit(): void {
		this.getUserDetail();
	}


	// switch to password screen
	changePassword(){
		this.showPassword=!this.showPassword;
	}

	onSubmit(personalInfo:any){

	}

	onSubmitAddress(addressInfo:any){
		this.errorMessage="";
		addressInfo.country="India";
		console.log(JSON.stringify(addressInfo));
		this.isLoading=true;
		this.studentService.profileAddress(addressInfo).subscribe(response=>{
			if(response['success']) {
				this.isLoading=false;
				this.messageService.successMessage('Address', 'Successfully Changed');
			}
		}, error=>{
			this.isLoading=false;
			this.errorMessage=error.error.msg;
			this.messageService.onErrorMessage(this.errorMessage);
		});
	}

	//input event on new password field
	onNewPassword(args){
		let newPassword = <TextField>args.object;
		this.newPass=newPassword.text.trim();
		console.log(this.newPass);
	}

	onconfirmNewPassword(args){
		let confirmNewPassword = <TextField>args.object;
		this.confirmPass=confirmNewPassword.text.trim();
		console.log(this.confirmPass);
		if(this.confirmPass!=this.newPass){
			this.matchpass=true;
			return;
		}
		else{
			this.matchpass=false;
		}

	}

	onPasswordSubmit(passwordInfo:any){
		this.isLoading=true;
		this.studentService.changePassword(passwordInfo).subscribe(response=>{
          console.log(JSON.stringify(response['data']));
			if(response['data']){
				this.isLoading=false;
				this.passwordInfo=null;
				this.messageService.successMessage('Password', 'Successfully Updated');
			}
		},error=>{
			this.isLoading=false;
			this.errorMessage=error.error.msg;
			console.log(JSON.stringify(error));
			this.messageService.onErrorMessage(this.errorMessage);
		}
		)
	}
	

	goBack(){
		this.routerExtensions.navigate(['/home'],{ clearHistory: true });
	}

	// Get user detail on basis of userId
	getUserDetail(){
		this.studentService.getDetails().subscribe((response)=>{
			if(response['data']){
				this.userData=response['data'];
				this.personalInfo=this.userData;
        this.addressInfo=this.userData.addressInfo;
			}
		}, (error)=>{
			this.errorMessage=error.msg; 
			this.messageService.onError(this.errorMessage);
		})		
	}

	onDrawerButtonTap(): void {
		const sideDrawer = <RadSideDrawer>app.getRootView();
		sideDrawer.showDrawer();
	}

}