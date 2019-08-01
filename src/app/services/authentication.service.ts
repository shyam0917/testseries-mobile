import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { Http, RequestOptions,Headers, URLSearchParams } from '@angular/http';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuthorizationService } from './authorization.service';
import { AppConfig } from '../config/app-config.constants';
import { CommonConfig } from '../config/common-config.constants';

@Injectable({
	providedIn: 'root'
})

export class AuthenticationService {

 public token: string;
	public userRole : string;

	constructor(
		private http: HttpClient,
		private router: Router,
		private authorizationService: AuthorizationService,
		private permissionsService: NgxPermissionsService,
		) { 
		this.authorizationService.userRoleChanged.subscribe((role: any) => {
			this.userRole = role;
		});
	}


	// user based login form for user ---
	login(authObj: any): Observable<string> {
		let headers = new HttpHeaders({
           'platform': CommonConfig.APP_PLATFORM.MOB,
            "Content-Type": "application/json",
         });

		return this.http.post(AppConfig.API_HOST+'/api/auth', authObj,{ headers: headers } )
		.map((response: any) => {
			// let res=response['data'].data;
			console.log(" hii" + JSON.stringify(response.data));
			// login successful if there's a jwt token in the response
			this.userRole=response['data'].role;
			let token = response['data'].authToken;
			let userName = response['data'].userName;
			let userId=response['data'].userId;
			let name=response['data'].name;
		
			if (token) {
				// set token property
				localStorage.setItem('userId',userId);
				this.token = token;
				localStorage.setItem('currentUser', JSON.stringify({ token: token}));
				return response;
			} else {
				// return false to indicate failed login
				return response;
			}
		},err=>{
			
		});
	}

	//get user role after succesfully logged in
	getRole(): string{
		if(!localStorage.getItem('currentUser')) {
			this.router.navigate(['/']);
		}else{
			if(this.userRole !='' || this.userRole != undefined){
				return this.userRole;
			}else{
				this.router.navigate(['/']);
			}
		}
	}


	// Delete local storage data and redirect to login page
	logout() {
		localStorage.removeItem('currentUser');
		localStorage.removeItem('userId');
		this.userRole = '';
		this.permissionsService.flushPermissions();
		this.authorizationService.showNavBar.emit(false);
		this.router.navigate(['/','login']);
	}

}
