import { Injectable } from '@angular/core';
// import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppConfig } from './../config/app-config.constants';
import { Router } from '@angular/router';
import { CommonConfig } from './../config/common-config.constants';
import { AuthorizationService } from './authorization.service';
import { map } from "rxjs/operators";

@Injectable({
	providedIn: 'root'
})
export class CourseService {

	constructor(
		private http: HttpClient,
		private authorizationService: AuthorizationService
		) { }


	//  To save new courses -
	saveCourse(data:any){
		return this.http.post(AppConfig.API_HOST+'/api/courses',data,this.authorizationService.authorization()).pipe(map(data=>
			data
			,(error:any)=>{
				error
			}));
	}

	// get all courses -
	getAllCourses(queryFilter: any={}){
		return this.http.get(AppConfig.API_HOST+'/api/courses',this.authorizationService.authorization(queryFilter)).pipe(
			map(data=>
				data
				,(error:any)=>{
					error
				}));
	}

	// Add new subject into couse -
	saveSubject(data:any){
		return this.http.post(AppConfig.API_HOST+'/api/courses/addSubject',data,this.authorizationService.authorization()).pipe(map(data=>
			data
			,(error:any)=>{
				error
			}));
	}

	// delete course by id
	deleteCourseById(id:String){
		return this.http.delete(AppConfig.API_HOST+'/api/courses/'+id,this.authorizationService.authorization()).pipe(
			map(data=>
				data
				,(error:any)=>{
					error
				}));
	}

	// to Activate couses by id  -
	activateCourseById(id:String){
		let data={};
		return this.http.put(AppConfig.API_HOST+'/api/courses/activate/'+id,data,this.authorizationService.authorization()).pipe(
			map(data=>
				data
				,(error:any)=>{
					error.json()
				}));
	}
  
	// to get courses by id
	getCoursesById(id:String){
		return this.http.get(AppConfig.API_HOST+'/api/courses/byId/'+id,this.authorizationService.authorization()).pipe(
			map(data=>
				data
				,(error:any)=>{
					error
				}));
	}
	// to add video into courses by id
	addCoursesVideoId(id:String,data:any){
		return this.http.put(AppConfig.API_HOST+'/api/courses/video/'+id,data,this.authorizationService.authorization()).pipe(
			map(data=>
				data
				,(error:any)=>{
					error
				}));
	}

	// to update status of course 
	courseViewChange(info:any,id:String){
		return this.http.put(AppConfig.API_HOST+'/api/courses/view/'+id,info,this.authorizationService.authorization()).pipe(
			map(data=>
				data
				,(error:any)=>{
					error
				}));
	}

	// to upload image on server -
	uploadImage(info:any){
		return this.http.post(AppConfig.API_HOST+'/api/courses/image',info,this.authorizationService.authorization()).pipe(
			map(data=>
				data
				,(error:any)=>{
					error
				}));
	}

	  // get all assign courses of student  -
	getAssignCourse(){
		return this.http.get(AppConfig.API_HOST+'/api/courses/mycourse',this.authorizationService.authorization()).pipe(
			map(data=>
				data
				,(error:any)=>{
					error
				}));
	}

}
