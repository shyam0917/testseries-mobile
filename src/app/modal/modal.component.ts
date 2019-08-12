import { Component, OnInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";

@Component({
	selector: "ModalView",
	moduleId: module.id,
	templateUrl: "./modal.component.html"
})
export class ModalComponent implements OnInit,OnDestroy {
	public isLoading:boolean=false;
	public modalData:any;
	constructor(private params: ModalDialogParams) { 
		this.modalData = params.context.data;
	}

	ngOnInit() {
console.log(JSON.stringify(this.modalData));
	}



	ngOnDestroy() {

	}


}