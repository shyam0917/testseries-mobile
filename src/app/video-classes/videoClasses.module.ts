import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { GridViewModule } from 'nativescript-grid-view/angular';
import { SearchRoutingModule } from "./videoClasses-routing.module";
import { VideoClassesComponent } from "./videoClasses.component";

@NgModule({
	imports: [
		NativeScriptCommonModule,
		SearchRoutingModule,
		GridViewModule
	],
	declarations: [
		VideoClassesComponent
	],
	schemas: [
		NO_ERRORS_SCHEMA
	]
})
export class VideoClassesModule { }
