import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { LiveClassesComponent } from "./liveClasses.component";

const routes: Routes = [
    { path: "", component: LiveClassesComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class LiveClassesRoutingModule { }
