import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { TabView } from "tns-core-modules/ui/tab-view";
import { ValidationConfig } from "../config/validation-config.constants";
import { TextField } from 'ui/text-field'; 
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
		confirmPassword:''
	}
	public personalInfo={
		name:'',
		email:'',
		mobile:''
	}
	public addressInfo={
		state:'',
		city:'',
		pinCode:'',
		address:''
	}
	public showPassword:boolean=false;
	public newPass:string="";
	public confirmPass:string="";
	public matchpass:boolean=false;
	public passwordpattern=ValidationConfig.PASSWORD_PATTERN;

	constructor(private routerExtensions: RouterExtensions) {
		// Use the component constructor to inject providers.
	}

	ngOnInit(): void {

	}


	// switch to password screen
	changePassword(){
		this.showPassword=!this.showPassword;
	}

	onSubmit(personalInfo:any){

	}

	onSubmitAddress(addressInfo:any){
  console.log(JSON.stringify(addressInfo));
	}

	//input event on new password field
	onNewPassword(args){
		let newPassword = <TextField>args.object;
		this.newPass=newPassword.text.trim();
		console.log(this.newPass);
	}

	onConfirmPassword(args){
		let confirmPassword = <TextField>args.object;
		this.confirmPass=confirmPassword.text.trim();
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
		console.log(JSON.stringify(passwordInfo));
	}

	goBack(){
		this.routerExtensions.navigate(['/home'],{ clearHistory: true });
	}

	onDrawerButtonTap(): void {
		const sideDrawer = <RadSideDrawer>app.getRootView();
		sideDrawer.showDrawer();
	}

}