import { Component, OnInit, ElementRef, ViewChild} from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { TabView } from "tns-core-modules/ui/tab-view";
import { ValidationConfig } from "../config/validation-config.constants";
import { TextField } from 'ui/text-field'; 
import { ImageCropper } from "nativescript-imagecropper";
import { StudentService } from '../services/student.service';
import { MessageService } from '../services/message.service';
import { RouterExtensions } from "nativescript-angular/router";
import {ImageSource, fromFile, fromResource, fromBase64} from "tns-core-modules/image-source";
import {Folder, path, knownFolders} from "tns-core-modules/file-system";
import * as imagepicker from "nativescript-imagepicker";
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
	public showButton:boolean=false;
	public passwordpattern=ValidationConfig.PASSWORD_PATTERN;
	public mobilepattern=ValidationConfig.MOB_NO_PATTERN;


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
		let userInfo={
			name:personalInfo.name,
			email:personalInfo.email,
			mobile:personalInfo.mobile
		}

		this.errorMessage="";
		this.successMessage="";
		this.isLoading=true;
		this.studentService.updateBasicInfo(userInfo).subscribe(response=>{
			if(response['success']) {
				this.isLoading=false;
				this.messageService.onSuccess(response['msg']);
			}
		}, error=>{
			this.isLoading=false;
			this.errorMessage=error.error.msg;
			this.messageService.onErrorMessage(this.errorMessage);
		});  
	}

selectImage(){
	let context = imagepicker.create({ mode: "single" }); 
			this.startSelection(context);

}

startSelection(context){
	context
	.authorize()
	.then( () =>{

		return context.present();
	})
	.then( (selection) =>{
		selection.forEach( (selected_item) =>{
			var path=selected_item.android;
			var pattern = /[^/]*$/;
			var imageName = JSON.stringify(path.match(pattern));	
			let imgstr=imageName.replace(/[^a-zA-Z0-9.]/g,'');

			let extn=imgstr.split(".").pop();
			if(extn.match(/^(|jpg|jpeg|png)$/)){
				// const imageFromLocalFile = ImageSource.fromFile(path);
				const imageFromLocalFile: ImageSource = <ImageSource> fromFile(path);
				var imageCropper = new ImageCropper();
				imageCropper.show(imageFromLocalFile,{width:300,height:300, lockSquare: true}).then((args) => {
 console.dir(args);
					 if(args.image !== null){
					 	debugger;
					 	console.log(args);
					// 	let payload="data:image/" +extn + ";base64,";
					// 	this.image = payload + args.image.toBase64String("jpeg");					
					// 	var stringLength = this.image.length - payload.length;
					// 	var sizeInBytes = 4 * Math.ceil((stringLength / 3))*0.5624896334383812;
					// 	var sizeInKb=sizeInBytes/1000;
					// 	if(sizeInKb>AppConfig.PROFILE_IMAGE_SIZE[1]){
					// 		Toast.makeText("File Size is too large").show();
					// 	}else{
					// 		this.uploadprofileImage(this.image);
					// 	}	
					 }
				})
				.catch(function(e){
					console.log(e)
					// Toast.makeText("Oops! Something went wrong").show();
				});
			}else{
				// Toast.makeText("Image type is not supported").show();
			}}
			);
	}).catch(function (e) {
		// Toast.makeText("Oops! Something went wrong").show();
	});
}



	onSubmitAddress(addressInfo:any){
		this.errorMessage="";
		if (Object.keys(addressInfo).every(function(x) { return addressInfo[x]===''|| addressInfo[x]===null;}) === false) {
			addressInfo.country="India";
			this.isLoading=true;
			this.studentService.profileAddress(addressInfo).subscribe(response=>{
				if(response['success']) {
					this.isLoading=false;
					this.messageService.onSuccess(response['msg']);
				}
			}, error=>{
				this.isLoading=false;
				this.errorMessage=error.error.msg;
				this.messageService.onErrorMessage(this.errorMessage);
			});
		} else {
			this.messageService.onErrorMessage("Please fill all the fields");
		}


	}

	//input event on new password field
	onNewPassword(args){
		let newPassword = <TextField>args.object;
		this.newPass=newPassword.text.trim();
	}

	onconfirmNewPassword(args){
		let confirmNewPassword = <TextField>args.object;
		this.confirmPass=confirmNewPassword.text.trim();
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
			if(response['success']){
				this.isLoading=false;
				this.passwordInfo={
					oldPassword:'',
					newPassword:'',
					confirmNewPassword:''
				};
				this.messageService.onSuccess(response['msg']);
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
			}

			if(response['data']['addressInfo']){
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