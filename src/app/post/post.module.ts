import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import {NativeScriptFormsModule} from "nativescript-angular/forms";
import { PostRoutingModule } from "./post-routing.module";
import { PostComponent } from "./post.component";


@NgModule({
	imports: [
	NativeScriptCommonModule,
	PostRoutingModule,
	NativeScriptFormsModule
	],
	declarations: [
	PostComponent,
	],
	schemas: [
	NO_ERRORS_SCHEMA
	]
})
export class PostModule { }
