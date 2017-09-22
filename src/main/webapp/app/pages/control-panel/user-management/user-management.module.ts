import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AppTranslationModule} from "../../../app.translation.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgaModule} from "../../../theme/nga.module";
import {WidgetModule} from "../../../widget/widget-module";
import {UserManagementService} from "./user-management.service";
import {UserManagementComponent} from "./user-management.component";
import {UserGridComponent} from "./user-grid/user-grid.component";
import {EventBroadcaster} from "../../../widget/grid/grid-event-broadcaster";
import {CreateUserComponent} from "./create-user/create-user.component";
import {UpdateUserComponent} from "./update-user/update-user.component";
import {routing} from "./user-management.routing";
import {ChangePasswordComponent} from "./change-password/change-password.component";

@NgModule({
    imports: [
        CommonModule,
        AppTranslationModule,
        ReactiveFormsModule,
        FormsModule,
        FormsModule,
        NgaModule,
        WidgetModule,
        routing
    ],
    declarations: [
        UserManagementComponent,
        UserGridComponent,
        CreateUserComponent,
        UpdateUserComponent,
        ChangePasswordComponent
    ],
    providers: [UserManagementService, EventBroadcaster]
})
export class UserManagementModule {
}
