import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import {NativeScriptFormsModule} from "nativescript-angular/forms";

import { SignupRoutingModule } from "./signup-routing.module";
import { SignupComponent } from "./signup.component";

@NgModule({
	imports: [
		NativeScriptCommonModule,
		SignupRoutingModule,
		NativeScriptFormsModule
	],
	declarations: [
		SignupComponent
	],
	schemas: [
		NO_ERRORS_SCHEMA
	]
})
export class SignupModule { }
