import {CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgaModule} from "../theme/nga.module";
import {AppTranslationModule} from "../app.translation.module";

import {GridViewComponent} from "./grid/grid-view.component";
import {GridViewService} from "./grid/grid-view.service";
import {NgbDropdownModule, NgbModalModule} from "@ng-bootstrap/ng-bootstrap";
import {SlimLoadingBarModule} from "ng2-slim-loading-bar";
import {ChosenComponent} from "./chosen/chosen.component";
import {FormsModule} from "@angular/forms";
import {EventBroadcaster} from "./grid/grid-event-broadcaster";
import {InputValidationComponent} from "./validation/input-validation.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AppTranslationModule,
        NgaModule,
        NgbDropdownModule,
        NgbModalModule,
        SlimLoadingBarModule.forRoot()],
    declarations: [GridViewComponent, ChosenComponent, InputValidationComponent],
    exports: [GridViewComponent, ChosenComponent, InputValidationComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class WidgetModule {
    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders> {
            ngModule: WidgetModule,
            providers: [GridViewService, EventBroadcaster],
        };
    }
}
