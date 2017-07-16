import {RouterModule, Routes} from "@angular/router";

import {ModuleWithProviders} from "@angular/core";
import {UserManagementComponent} from "./user-management/user-management.component";

export const routes: Routes = [
    {
        path: 'user-management',
        component: UserManagementComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
