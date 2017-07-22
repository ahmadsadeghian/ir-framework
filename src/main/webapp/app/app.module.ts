import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Http, HttpModule, RequestOptions, XHRBackend} from "@angular/http";
import {RouterModule} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {routing} from "./app.routing";
import {App} from "./app.component";
import {AppState, InternalStateType} from "./app.service";
import {GlobalState} from "./global.state";
import {NgaModule} from "./theme/nga.module";
import {PagesModule} from "./pages/pages.module";
import {AuthService} from "./auth.service";
import {UserRouteAccessService} from "./shared/auth/user-route-access-service";
import {Principal} from "./shared/auth/principal.service";
import {StateStorageService} from "./shared/auth/state-storage.service";
import {Ng2Webstorage} from "ng2-webstorage";
import {httpFactory} from "./shared/intercepted-http-factory";
import {WidgetModule} from "./widget/widget-module";
import {NotificationService} from "./shared/notification-service";

// Application wide providers
const APP_PROVIDERS = [
    AppState,
    GlobalState
];

export type StoreType = {
    state: InternalStateType,
    restoreInputValues: () => void,
    disposeOldHosts: () => void
};


/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
    bootstrap: [App],
    declarations: [
        App
    ],
    imports: [ // import Angular's modules
        BrowserModule,
        HttpModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgaModule.forRoot(),
        NgbModule.forRoot(),
        Ng2Webstorage.forRoot(),
        PagesModule.forRoot(),
        WidgetModule.forRoot(),
        routing
    ],
    providers: [ // expose our Services and Providers into Angular's dependency injection
        APP_PROVIDERS,
        UserRouteAccessService,
        AuthService,
        Principal,
        StateStorageService,
        NotificationService,
        {
            provide: Http,
            useFactory: httpFactory,
            deps: [XHRBackend, RequestOptions]
        }
    ]
})

export class AppModule {

    constructor(public appState: AppState) {
    }
}
