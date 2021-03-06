import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
	{ path: "", redirectTo: "/login", pathMatch: "full" },
	{ path: "login", loadChildren: "~/app/login/login.module#LoginModule" },
	{ path: "signup", loadChildren: "~/app/signup/signup.module#SignupModule" },
	{ path: "playlist", loadChildren: "~/app/playlist/playlist.module#PlaylistModule" },
	{ path: "videoPlayer", loadChildren: "~/app/video-player/video-player.module#VideoPlayerModule" },
	{ path: "profile", loadChildren: "~/app/profile/profile.module#ProfileModule" },
	// { path: "home", loadChildren: "~/app/home/home.module#HomeModule" },
	{ path: "post", loadChildren: "~/app/post/post.module#PostModule" },
	{ path: "player", loadChildren: "~/app/player/player.module#PlayerModule" },
	{ path: "preview", loadChildren: "~/app/preview/preview.module#PreviewModule" },
	{ path: "userpost", loadChildren: "~/app/user-posts/userpost.module#UserPostModule" },
	{ path: "demo", loadChildren: "~/app/demo-courses/demoCourses.module#DemoCoursesModule" },
	{ path: "videoClasses", loadChildren: "~/app/video-classes/videoClasses.module#VideoClassesModule" },
	{ path: "myCourses", loadChildren: "~/app/myCourses/myCourses.module#MyCoursesModule" },
	{ path: "liveClasses", loadChildren: "~/app/liveClasses/liveClasses.module#LiveClassesModule" },
	{ path: "livelist", loadChildren: "~/app/livelist/livelist.module#LiveListModule" }
];

@NgModule({
	imports: [NativeScriptRouterModule.forRoot(routes)],
	exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
