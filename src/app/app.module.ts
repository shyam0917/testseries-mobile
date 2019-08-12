import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NgxPermissionsModule, NgxPermissionsGuard } from 'ngx-permissions';
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { AuthorizationService } from "./services/authorization.service";
import { MessageService } from "./services/message.service";

import { NativeScriptHttpModule } from "nativescript-angular";import { AppRoutingModule } from "./app-routing.module";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { ModalComponent } from "./modal/modal.component";
import { ModalDialogService} from "nativescript-angular/directives/dialogs";
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
	ModalComponent,
	],
	providers: [
	AuthorizationService,
	MessageService,
	],
	schemas: [
	NO_ERRORS_SCHEMA
	],
})
export class AppModule { }
