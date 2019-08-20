import { Injectable, EventEmitter } from '@angular/core';
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
export class ProfileService {

public updateProfile: EventEmitter<any> = new EventEmitter();
	
	constructor(
	private http: HttpClient,
	private authorizationService : AuthorizationService) { }
	
		  // service method to upload image
		  uploadFile(imageData) {
		  	return this.http.put(AppConfig.API_HOST + "/api/profiles/image", imageData,this.authorizationService.authorization()).map(data=>
		  		data,
		  		(error:any)=>error);

		  }


}
