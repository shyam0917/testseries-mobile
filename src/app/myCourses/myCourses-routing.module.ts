import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { MyCoursesComponent } from "./myCourses.component";

const routes: Routes = [
    { path: "", component: MyCoursesComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class MyCoursesRoutingModule { }
