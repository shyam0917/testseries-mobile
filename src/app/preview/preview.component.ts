import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { StudentService } from '../services/student.service';
import { MessageService } from '../services/message.service';

@Component({
	selector: 'Preview',
	templateUrl: './preview.component.html',
	moduleId: module.id,
	providers:[StudentService]
})
export class PreviewComponent implements OnInit {
	public courseId:any;
	public previewData:any;
	public isLoading:boolean=false;

	constructor(private route: ActivatedRoute,
		private studentService: StudentService,
		private routerExtensions: RouterExtensions,
		private messageService: MessageService) { 
		this.route.queryParams.subscribe(params => {
			this.courseId=JSON.parse(params.courseId);
		});
	}

	ngOnInit() {
		this.getCoursesById();
	}

	getCoursesById(){
		this.isLoading=true;
		this.studentService.getCoursesDataById(this.courseId).subscribe(res=>{
			if(res['data']){
				this.isLoading=false;
				this.previewData=res['data'][0];
				console.log(JSON.stringify(this.previewData.amount));
			}
		},err=>{
			this.messageService.onError(err.err);
		})

	}

	public toggle(preitem) {
	preitem.visible = !preitem.visible;
}

goBack(){
	this.routerExtensions.backToPreviousPage();
}

}
