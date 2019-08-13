import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { LiveClassesRoutingModule } from "./liveClasses-routing.module";
import { LiveClassesComponent } from "./liveClasses.component";
import { GridViewModule } from 'nativescript-grid-view/angular';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        LiveClassesRoutingModule,
        GridViewModule
    ],
    declarations: [
        LiveClassesComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class LiveClassesModule { }
