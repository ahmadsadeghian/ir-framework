import {ModuleWithProviders, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {routing} from "./pages.routing";
import {NgaModule} from "../theme/nga.module";
import {AppTranslationModule} from "../app.translation.module";

import {Pages} from "./pages.component";
import {WidgetModule} from "../widget/widget-module";

@NgModule({
    imports: [CommonModule, AppTranslationModule, NgaModule, WidgetModule, routing],
    declarations: [Pages]
})
export class PagesModule {
    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders> {
            ngModule: PagesModule
        };
    }
}
