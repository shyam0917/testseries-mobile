import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import {NativeScriptFormsModule} from "nativescript-angular/forms";

import { PlayerRoutingModule } from "./player-routing.module";
import { PlayerComponent } from "./player.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        PlayerRoutingModule,
    ],
    declarations: [
        PlayerComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PlayerModule { }
