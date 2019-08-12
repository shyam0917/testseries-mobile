import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { PreviewRoutingModule } from "./preview-routing.module";
import { PreviewComponent } from "./preview.component";


@NgModule({
	imports: [
	NativeScriptCommonModule,
	PreviewRoutingModule,
	],
	declarations: [
	PreviewComponent,
	],
	schemas: [
	NO_ERRORS_SCHEMA
	]
})
export class PreviewModule { }
