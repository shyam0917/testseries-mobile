import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { DemoCoursesComponent } from "./demoCourses.component";

const routes: Routes = [
    { path: "", component: DemoCoursesComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class DemoCoursesRoutingModule { }
