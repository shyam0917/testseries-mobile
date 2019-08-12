import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { UserPostRoutingModule } from "./userpost-routing.module";
import { UserPostComponent } from "./userpost.component";



@NgModule({
	imports: [
	NativeScriptCommonModule,
	UserPostRoutingModule,
	],
	declarations: [
	UserPostComponent,
	],
	schemas: [
	NO_ERRORS_SCHEMA
	]

})
export class UserPostModule { }
