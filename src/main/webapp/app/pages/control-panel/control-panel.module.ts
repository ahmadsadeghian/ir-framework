import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AppTranslationModule} from "../../app.translation.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgaModule} from "../../theme/nga.module";
import {routing} from "./control-panel.routing";
import {WidgetModule} from "../../widget/widget-module";
import {ControlPanelComponent} from "./control-panel.component";
import {UserManagementModule} from "./user-management/user-management.module";

@NgModule({
    imports: [
        CommonModule,
        AppTranslationModule,
        ReactiveFormsModule,
        FormsModule,
        FormsModule,
        NgaModule,
        WidgetModule,
        routing,
        UserManagementModule
    ],
    declarations: [
        ControlPanelComponent,
    ],
    providers: []
})
export class ControlPanelModule {
}
