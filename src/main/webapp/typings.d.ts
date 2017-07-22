/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
    id: string;
}

/*
 * Custom Type Definitions
 * When including 3rd party modules you also need to include the type definition for the module
 * if they don't provide one within the module. You can try to install it with @types
 npm install @types/node
 npm install @types/lodash
 * If you can't find the type definition in the registry we can make an ambient/global definition in
 * this file for now. For example
 declare module 'my-module' {
 export function doesSomething(value: string): string;
 }
 * If you are using a CommonJS module that is using module.exports then you will have to write your
 * types using export = yourObjectOrFunction with a namespace above it
 * notice how we have to create a namespace that is equal to the function we're assigning the export to
 declare module 'jwt-decode' {
 function jwtDecode(token: string): any;
 namespace jwtDecode {}
 export = jwtDecode;
 }
 *
 * If you're prototying and you will fix the types later you can also declare it as type any
 *
 declare var assert: any;
 declare var _: any;
 declare var $: any;
 *
 * If you're importing a module that uses Node.js modules which are CommonJS you need to import as
 * in the files such as main.browser.ts or any file within app/
 *
 import * as _ from 'lodash'
 * You can include your type definitions in this file until you create one for the @types
 *
 */

interface JQuery {
    easyPieChart;
}

declare var GoogleMapsLoader: any;
declare var L: any;
declare var AmCharts: any;
declare var Chart: any;
declare var Chartist: any;
declare const chroma: any;


/// <reference path="../jquery/jquery.d.ts" />

/* tslint:disable: interface-name no-any */

interface JQueryStatic {
    /* tslint:enable: interface-name */
    notify(message: string): INotifyReturn;
    notify(opts: INotifyOptions, settings?: INotifySettings): INotifyReturn;
    notifyDefaults(settings: INotifySettings): void;
    notifyClose(): void;
    notifyClose(command: string): void;
}

interface INotifyOptions {
    message: string;
    title?: string;
    icon?: string;
    url?: string;
    target?: string;
}

interface INotifySettings {
    element?: string;
    position?: string;
    type?: string;
    allow_dismiss?: boolean;
    allow_duplicates?: boolean;
    newest_on_top?: boolean;
    showProgressbar?: boolean;
    placement?: {
        from?: string;
        align?: string;
    };
    offset?: number;
    spacing?: number;
    z_index?: number;
    delay?: number;
    timer?: number;
    url_target?: string;
    mouse_over?: Function;
    animate?: {
        enter?: string;
        exit?: string;
    };
    onShow?: () => void;
    onShown?: () => void;
    onClose?: () => void;
    onClosed?: () => void;
    icon_type?: string;
    template?: string;
}

interface INotifyReturn {
    $ele: JQueryStatic;
    close: () => void;
    update: (command: string, update: any) => void;
}
