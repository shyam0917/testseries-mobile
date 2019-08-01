import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page";
import { Router,ActivatedRoute } from '@angular/router';
import { getRootView } from "tns-core-modules/application";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { MessageService } from './../services/message.service';
import { AuthenticationService } from './../services/authentication.service';
import { AppConfig } from './../config/app-config.constants';
import { CommonConfig } from './../config/common-config.constants';
import { ValidationConfig } from './../config/validation-config.constants';
import { MessageConfig } from './../config/message-config.constants';

import { Color } from "tns-core-modules/color";
import { TextField } from "tns-core-modules/ui/text-field";
import { Label } from "tns-core-modules/ui/label";

@Component({
	selector: 'ns-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	providers:[MessageService,AuthenticationService],
	moduleId: module.id,
})
export class LoginComponent implements OnInit {
	private drawer: RadSideDrawer;
	public loginInfo = {
		email: "",
		password: ""
	};
	public errorMessage: any;
	public AppConfig: any = AppConfig;
	public emailpattern=ValidationConfig.EMAIL_PATTERN;
	notifyErrorMsg: any;
	notifySuccessMsg: any;
	uniqeId: string;
	isLoading:boolean=false;
	isVerified:boolean=true;
	public logincounter:number=0;
	public failedAttempt:boolean=false;
	public completedAttempts:boolean=false;
	public showVarification: boolean=false;

	constructor(private routerExtensions: RouterExtensions,
		private page: Page, private router: Router,
		private messageService: MessageService,
		private loginService: AuthenticationService) { }

	ngOnInit() {
		this.page.actionBarHidden = true;
	}

	onFocus(args: any,labelObj) {
		// console.log(args)
		const textField = <TextField>args.object;

		// animate the label sliding up and less transparent.
		labelObj.animate({
			translate: { x: 0, y: - 25 },
			opacity: 1,
		}).then(() => { }, () => { });

		// set the border bottom color to green to indicate focus
		textField.borderBottomColor = new Color('#4CAF50');
	}

	onBlur(args: any, labelObj) {
		// const label = this.label.nativeElement;
		const textField = <TextField>args.object;

		// if there is text in our input then don't move the label back to its initial position.
		if (!textField.text) {
			labelObj.animate({
				translate: { x: 0, y: 0 },
				opacity: 0.4
			}).then(() => { }, () => { });
		}
		// reset border bottom color.
		textField.borderBottomColor = new Color('#A9A9A9');
	}


	// For login
	onloginClick(loginInfo:any) {
		this.isVerified=true;
		this.errorMessage = '';
		let email=loginInfo.email;
		if(!email.match(/[a-zA-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-z0-9!#$%&'*+/=?^_`{|}~-]+)*@gmail\.com?/)){
			this.errorMessage ='Please enter valid email';
			return;
		}	
		this.errorMessage ='';
		let authObj = {
			email: loginInfo.email,
			password: loginInfo.password
		}
		this.failedAttempt=true;
		this.isLoading=true;
		this.loginService.login(authObj).subscribe((res:any) => {
			console.log(JSON.stringify(res));
			this.isLoading=false;
			this.routerExtensions.navigate(['/home']);

		}, error=> {
			this.isLoading=false;
			this.failedAttempt=false;
			this.errorMessage =error.error.msg;
			this.messageService.onErrorMessage(this.errorMessage);
		})

	}  


	gotoSignup(){
		this.routerExtensions.navigate(['/signup']);
	}


}
