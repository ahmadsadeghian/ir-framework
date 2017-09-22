import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {UserManagementComponent} from "./user-management/user-management.component";
import {ControlPanelComponent} from "./control-panel.component";
import {CreateUserComponent} from "./user-management/create-user/create-user.component";
import {UpdateUserComponent} from "./user-management/update-user/update-user.component";

export const routes: Routes = [
    {
        path: '',
        component: ControlPanelComponent,
        children: [{
            path: 'user-management',
            loadChildren: './user-management/user-management.module#UserManagementModule'
        }]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
