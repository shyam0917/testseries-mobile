import { Injectable } from '@angular/core';
// import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppConfig } from './../config/app-config.constants';
import { Router } from '@angular/router';
import { map } from "rxjs/operators";


@Injectable({
	providedIn: 'root'
})
export class RegisterService {

	constructor(
	private http: HttpClient,
	) { }
	
	// Store Registration info in database
	register(registerInfo: any) {
		return this.http.post(AppConfig.API_HOST+'/api/student/register', registerInfo,{ headers: this.setPlatform() }).pipe(map(data =>
			data
			,(error: any) => {
				error;
			}));
	}

		// Set Platform in request header to track application
	setPlatform(){
		let headers = new HttpHeaders({ 'platform': 'Mobile' });
		return headers;
	}
}
