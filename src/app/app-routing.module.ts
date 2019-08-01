import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
	{ path: "", redirectTo: "/login", pathMatch: "full" },
	{ path: "login", loadChildren: "~/app/login/login.module#LoginModule" },
	{ path: "signup", loadChildren: "~/app/signup/signup.module#SignupModule" },
	{ path: "home", loadChildren: "~/app/home/home.module#HomeModule" },
	{ path: "sidebar", loadChildren: "~/app/sidebar/sidebar.module#SidebarModule" },
	{ path: "videoClasses", loadChildren: "~/app/video-classes/videoClasses.module#VideoClassesModule" },
	{ path: "myCourses", loadChildren: "~/app/myCourses/myCourses.module#MyCoursesModule" },
	{ path: "settings", loadChildren: "~/app/settings/settings.module#SettingsModule" }
];

@NgModule({
	imports: [NativeScriptRouterModule.forRoot(routes)],
	exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
