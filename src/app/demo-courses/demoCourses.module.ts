import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { DemoCoursesRoutingModule } from "./demoCourses-routing.module";
import { DemoCoursesComponent } from "./demoCourses.component";

@NgModule({
	imports: [
		NativeScriptCommonModule,
		DemoCoursesRoutingModule,
	],
	declarations: [
		DemoCoursesComponent
	],
	schemas: [
		NO_ERRORS_SCHEMA
	]
})
export class DemoCoursesModule { }
