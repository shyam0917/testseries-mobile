import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NgxPermissionsModule, NgxPermissionsGuard } from 'ngx-permissions';
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { AuthorizationService } from "./services/authorization.service";
import { MessageService } from "./services/message.service";
import { ModalDialogService } from "nativescript-angular/modal-dialog";

import { NativeScriptHttpModule } from "nativescript-angular";import { AppRoutingModule } from "./app-routing.module";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { AppComponent } from "./app.component";
require("nativescript-localstorage");

@NgModule({
	bootstrap: [
	AppComponent
	],
	imports: [
	AppRoutingModule,
	NativeScriptModule,
	NgxPermissionsModule.forRoot(),
	NativeScriptHttpClientModule,
	NativeScriptHttpModule,
	NativeScriptUISideDrawerModule,
	],
	declarations: [
	AppComponent,
	SidebarComponent,
	],
	providers: [
    AuthorizationService,
    MessageService,
    ModalDialogService
    ],
	schemas: [
	NO_ERRORS_SCHEMA
	]
})
export class AppModule { }
