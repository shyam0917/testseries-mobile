import { Injectable, EventEmitter } from '@angular/core';
// import { Http, RequestOptions,Headers, URLSearchParams } from '@angular/http';
import { HttpClient, HttpHeaders,HttpParams} from "@angular/common/http";
import { CommonConfig } from './../config/common-config.constants';
import { Router, CanActivate } from '@angular/router';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { AppConfig } from './../config/app-config.constants';
import { map } from "rxjs/operators";

@Injectable({
	providedIn: 'root'
})
export class AuthorizationService {
	
	public showNavBar: EventEmitter<any> = new EventEmitter();
	public getRole: EventEmitter<any> = new EventEmitter();
	public userRoleChanged: EventEmitter<any> = new EventEmitter();
	public userRole : string;

	constructor(private http: HttpClient, private router: Router,
		private permissionsService: NgxPermissionsService,) { }

	
	canActivate(){
		if (localStorage.getItem('currentUser')) {
			return this.getUserRole().map((res) =>{
				debugger;
				// this.userRole = res.data.userRole;
				this.permissionsService.loadPermissions([this.userRole]);
				this.userRoleChanged.emit(this.userRole);
				this.getRole.emit(this.userRole);
				return true;        
			},(error)=> {
				return false;
			})
		}else {
			// not logged in so redirect to login page
			//this.hideNavBar.emit(true);
			this.router.navigate(['/']);
			return;
		}
	}

	canActivateChild(){
		if (localStorage.getItem('currentUser')) {
			return this.getUserRole().map((res) =>{
				// this.userRole = res.data.userRole;
				return true;        
			})
		}
		else {
			// not logged in so redirect to login page
			this.router.navigate(['/']);
			return;
		}
	}

	//get user role on page refresh
	getUserRole(){
		return this.http
		.get(AppConfig.API_HOST+'/api/role', this.authorization())
		.map(response=>response,error=>{
			error});
	}
	

	authorization(param:any=null) {
		if(!localStorage.getItem('currentUser')) {
			this.router.navigate(['/']);
		}else {
			let token = JSON.parse(localStorage.getItem('currentUser'))['token'];
			if (token) {
				let headers = new HttpHeaders({ 'Authorization': token });
				headers.append('platform',CommonConfig.APP_PLATFORM.MOB)
				if(param) {
					let pararms= this.getParams(param);
				let options={
					headers:headers,
					search: pararms
				}
					return options
				}
				
				return { headers: headers };
			}else{
				this.router.navigate(['/']);
			}
		}
	}

		// set url search parameters
	getParams(param:any) {
		 let params: HttpParams = new HttpParams();
		for (let key in param) {
			if (param.hasOwnProperty(key)) {
				let val = param[key];
				if(Array.isArray(val)) {
					val.forEach(v=> {
						params.append(key, v);
					});
				}else {
					params.set(key, val);
				}
			}
		}
		return params;
	}


	// Set Platform in request header to track application
	setPlatform(){
		let headers = new HttpHeaders({ 'platform': CommonConfig.APP_PLATFORM.MOB });
		return headers;
	}

}
