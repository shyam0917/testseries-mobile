import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { SidebarRoutingModule } from "./sidebar-routing.module";
import { SidebarComponent } from "./sidebar.component";

@NgModule({
	imports: [
		NativeScriptCommonModule,
		SidebarRoutingModule,
	],
	declarations: [
		SidebarComponent
	],
	schemas: [
		NO_ERRORS_SCHEMA
	]
})
export class SidebarModule { }
