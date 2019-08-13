import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { MyCoursesRoutingModule } from "./myCourses-routing.module";
import { GridViewModule } from 'nativescript-grid-view/angular';
import { MyCoursesComponent } from "./myCourses.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        MyCoursesRoutingModule,
         GridViewModule,
    ],
    declarations: [
        MyCoursesComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class MyCoursesModule { }
