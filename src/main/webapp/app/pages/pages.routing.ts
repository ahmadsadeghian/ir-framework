import {RouterModule, Routes} from "@angular/router";
import {Pages} from "./pages.component";
import {ModuleWithProviders} from "@angular/core";
import {UserRouteAccessService} from "../shared/auth/user-route-access-service";

export const routes: Routes = [
    {
        path: 'login',
        loadChildren: './login/login.module#LoginModule'
    },
    {
        path: 'register',
        loadChildren: './register/register.module#RegisterModule'
    },
    {
        path: 'pages',
        component: Pages,
        canLoad: [UserRouteAccessService],
        canActivateChild: [UserRouteAccessService],
        data: {
            authorities: ['ROLE_USER']
        },
        children: [
            {
                path: '', redirectTo: 'dashboard', pathMatch: 'full', data: {authorities: ['ROLE_USER']},
            },
            {
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule',
                data: {authorities: ['ROLE_USER']}
            },
            {
                path: 'control-panel',
                loadChildren: './control-panel/control-panel.module#ControlPanelModule',
                data: {authorities: ['ROLE_ADMIN']}
            },
            {
                path: 'editors',
                loadChildren: './editors/editors.module#EditorsModule',
                data: {authorities: ['ROLE_USER']}
            },
            {
                path: 'components',
                loadChildren: './components/components.module#ComponentsModule',
                data: {authorities: ['ROLE_USER']}
            },
            {path: 'charts', loadChildren: './charts/charts.module#ChartsModule', data: {authorities: ['ROLE_USER']}},
            {path: 'ui', loadChildren: './ui/ui.module#UiModule', data: {authorities: ['ROLE_USER']}},
            {path: 'forms', loadChildren: './forms/forms.module#FormsModule', data: {authorities: ['ROLE_USER']}},
            {path: 'tables', loadChildren: './tables/tables.module#TablesModule', data: {authorities: ['ROLE_USER']}},
            {path: 'maps', loadChildren: './maps/maps.module#MapsModule', data: {authorities: ['ROLE_USER']}}
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
