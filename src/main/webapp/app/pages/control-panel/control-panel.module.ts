import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AppTranslationModule} from "../../app.translation.module";
import {ReactiveFormsModule} from "@angular/forms";
import {FormsModule} from "../forms/forms.module";
import {NgaModule} from "../../theme/nga.module";
import {routing} from "./control-panel.routing";
import {WidgetModule} from "../../widget/widget-module";
import {UserManagementService} from "./user-management/user-management.service";
import {UserManagementComponent} from "./user-management/user-management.component";
import {UserSearchComponent} from "./user-management/user-search.component";
import {EventBroadcaster} from "../../widget/grid/grid-event-broadcaster";
import {UserFormComponent} from "./user-management/user-form.component";
import {ControlPanelComponent} from "./control-panel.component";

@NgModule({
    imports: [
        CommonModule,
        AppTranslationModule,
        ReactiveFormsModule,
        FormsModule,
        NgaModule,
        WidgetModule,
        routing
    ],
    declarations: [ControlPanelComponent, UserManagementComponent, UserSearchComponent, UserFormComponent],
    providers: [UserManagementService, EventBroadcaster]
})
export class ControlPanelModule {
}
