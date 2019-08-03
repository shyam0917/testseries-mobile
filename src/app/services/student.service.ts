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

}
