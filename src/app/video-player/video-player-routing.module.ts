import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { VideoPlayerComponent } from "./video-player.component";

const routes: Routes = [
    { path: "", component: VideoPlayerComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class VideoPlayerRoutingModule { }
