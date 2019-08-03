import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { YoutubePlayerModule } from 'nativescript-youtubeplayer/angular';
import { VideoPlayerRoutingModule } from "./video-player-routing.module";
import { VideoPlayerComponent } from "./video-player.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        VideoPlayerRoutingModule,
        YoutubePlayerModule
    ],
    declarations: [
        VideoPlayerComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class VideoPlayerModule { }
