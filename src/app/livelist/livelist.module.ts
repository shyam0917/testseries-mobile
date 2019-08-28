import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { LiveListRoutingModule } from "./livelist-routing.module";
import { LiveListComponent } from "./livelist.component";
import { GridViewModule } from 'nativescript-grid-view/angular';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        LiveListRoutingModule,
        GridViewModule
    ],
    declarations: [
        LiveListComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class LiveListModule { }
