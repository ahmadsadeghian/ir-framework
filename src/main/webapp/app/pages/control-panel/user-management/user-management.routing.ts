import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {CreateUserComponent} from "./create-user/create-user.component";
import {UpdateUserComponent} from "./update-user/update-user.component";
import {UserManagementComponent} from "./user-management.component";
import {UserGridComponent} from "./user-grid/user-grid.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";

export const routes: Routes = [
    {
        path: '',
        component: UserManagementComponent,
        data: {authorities: ['ROLE_ADMIN']},
        children: [
            {
                path: '',
                component: UserGridComponent,
                data: {authorities: ['ROLE_ADMIN']}
            }, {
                path: 'create',
                component: CreateUserComponent,
                data: {authorities: ['ROLE_ADMIN']}
            }, {
                path: 'update/:id',
                component: UpdateUserComponent,
                data: {authorities: ['ROLE_ADMIN']}
            }, {
                path: 'change-password/:id',
                component: ChangePasswordComponent,
                data: {authorities: ['ROLE_ADMIN']}
            }
        ]
    }

];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
