import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { ModalComponent } from "../modal/modal.component";
import { PlaylistRoutingModule } from "./playlist-routing.module";
import { PlaylistComponent } from "./playlist.component";

@NgModule({
	imports: [
		NativeScriptCommonModule,
		PlaylistRoutingModule
	],
	declarations: [
		PlaylistComponent
	],
	schemas: [
		NO_ERRORS_SCHEMA
	]
})
export class PlaylistModule { }
