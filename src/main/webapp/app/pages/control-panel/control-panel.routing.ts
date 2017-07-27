import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {UserManagementComponent} from "./user-management/user-management.component";
import {ControlPanelComponent} from "./control-panel.component";
import {CreateUserComponent} from "./user-management/create-user.component";
import {UpdateUserComponent} from "./user-management/update-user.component";

export const routes: Routes = [
    {
        path: '',
        component: ControlPanelComponent,
        children: [{
            path: 'user-management',
            component: UserManagementComponent,
            data: {authorities: ['ROLE_ADMIN']}
        }, {
            path: 'user-management/create',
            component: CreateUserComponent,
            data: {authorities: ['ROLE_ADMIN']}
        }, {
            path: 'user-management/update/:id',
            component: UpdateUserComponent,
            data: {authorities: ['ROLE_ADMIN']}
        }]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
