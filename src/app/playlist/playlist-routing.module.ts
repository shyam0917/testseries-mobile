import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { PlaylistComponent } from "./playlist.component";


const routes: Routes = [
{ path: "", component: PlaylistComponent }


];

@NgModule({
	imports: [NativeScriptRouterModule.forChild(routes)],
	exports: [NativeScriptRouterModule]
})
export class PlaylistRoutingModule { }
