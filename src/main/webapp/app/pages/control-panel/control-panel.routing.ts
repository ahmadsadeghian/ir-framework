import {RouterModule, Routes} from "@angular/router";

import {ModuleWithProviders} from "@angular/core";
import {UserManagementComponent} from "./user-management/user-management.component";
import {UserFormComponent} from "./user-management/user-form.component";
import {ControlPanelComponent} from "./control-panel.component";

export const routes: Routes = [
    {
        path: '',
        component: ControlPanelComponent,
        children: [{
            path: 'user-management',
            component: UserManagementComponent,
            data: {authorities: ['ROLE_ADMIN']}
        }, {
            path: 'user-management/new',
            component: UserFormComponent,
            data: {authorities: ['ROLE_ADMIN']}
        }]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
