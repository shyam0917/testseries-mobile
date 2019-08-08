import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { ProfileRoutingModule } from "./profile-routing.module";
import { ProfileComponent } from "./profile.component";
import {NativeScriptFormsModule} from "nativescript-angular/forms";

@NgModule({
	imports: [
		NativeScriptCommonModule,
		ProfileRoutingModule,
		NativeScriptFormsModule
	],
	declarations: [
		ProfileComponent,
	],
	schemas: [
		NO_ERRORS_SCHEMA
	]
})
export class ProfileModule { }
