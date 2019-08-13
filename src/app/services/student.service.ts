import { Injectable } from '@angular/core';
// import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuthorizationService } from './authorization.service';

import { AppConfig } from './../config/app-config.constants';
import { Router } from '@angular/router';
import { map } from "rxjs/operators";


@Injectable({
	providedIn: 'root'
})
export class StudentService {

	constructor(
	private http: HttpClient,
	private authorizationService : AuthorizationService) { }
	
	// find student by id
	getStudentInfo(queryFlag:any){
		return this.http.get(AppConfig.API_HOST+'/api/students/idSet?q='+queryFlag,this.authorizationService.authorization()).pipe(map(data=>
			data
			,(error:any)=>{
				error
			}));
	}


		// get all posts by fielter
	getAllPosts(queryFilter: any={}){
		return this.http.get(AppConfig.API_HOST+'/api/posts',this.authorizationService.authorization(queryFilter)).pipe(
			map(data=>
				data
				,(error:any)=>{
					error
				}));
	}

// to get courses by id
	getCoursesDataById(id:String){
		return this.http.get(AppConfig.API_HOST+'/api/courses/byCourseId/'+id,this.authorizationService.authorization()).pipe(
			map(data=>
				data
				,(error:any)=>{
					error
				}));
	}


		/* get user profile details */
	getDetails(){
		return this.http.get(AppConfig.API_HOST + "/api/profiles",this.authorizationService.authorization()).pipe(
			map(data=>
				data
				,(error:any)=>{
					error
				}));
	}

		// update profile address -`
	profileAddress(addressData){
		return this.http.put(AppConfig.API_HOST + "/api/profiles/address",addressData,this.authorizationService.authorization()).pipe(
			map(data=>
				data
				,(error:any)=>{
					error
				}));
	}

	 // Change Password
	changePassword(passwordData){
		return this.http.put(AppConfig.API_HOST + "/api/users/profile/change-password",passwordData,this.authorizationService.authorization()).pipe(
			map(data=>
				data
				,(error:any)=>{
					error
				}));
	}

 // update basic info of user
 updateBasicInfo(basicInfo){
		return this.http.put(AppConfig.API_HOST+"/api/profiles",basicInfo,this.authorizationService.authorization()).pipe(
			map(data=>
				data
				,(error:any)=>{
					error
				}));
	}
}
