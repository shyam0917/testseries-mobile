import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SearchRoutingModule } from "./videoClasses-routing.module";
import { VideoClassesComponent } from "./videoClasses.component";

@NgModule({
	imports: [
		NativeScriptCommonModule,
		SearchRoutingModule
	],
	declarations: [
		VideoClassesComponent
	],
	schemas: [
		NO_ERRORS_SCHEMA
	]
})
export class VideoClassesModule { }
