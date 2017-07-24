export class GridColumn {
    constructor(public name: string,
                public title: string = name,
                public width: string = 'auto',
                public visible: boolean = true,
                public editMode: boolean = true,
                public isRowIndex: boolean = false) {
    }
}

export class HiddenColumn extends GridColumn {
    constructor(public name: string) {
        super(name, name, 'auto', false, false);
    }
}

export class DisabledColumn extends GridColumn {
    constructor(public name: string, public title: string, public width: string = 'auto') {
        super(name, title, width, true, false);
    }
}

export class RowIndexColumn extends GridColumn {
    constructor() {
        super('index', 'ردیف', '75px', true, false, true);
    }
}

export class GridCommand {
    constructor(public title: string = name,
                public icon: string = '',
                public callback: ((e) => void),
                public isGlobal: boolean = false) {
    }
}

export class GlobalCommand extends GridCommand {
    constructor(public title: string = name,
                public icon: string = '',
                public callback: ((e) => void)) {
        super(title, icon, callback, true);
    }
}

export enum GridSelectMode {
    None, Single, Multiple
}

export class Pageable {
    constructor(public  page: number, public size: number, public total: number = 0) {
    }
}

export class Sortable {

}

export class GridQuery {
    constructor(public pageable: Pageable,
                public sortable: Sortable,
                public total: number = 0,
                public numberOfPages: number = 1) {
    }
}

export class EventArgs<T> {
    constructor(public arg: T = null, public eventName: string = '') {
    }
}

export class GridConfig {
    constructor(public columns: GridColumn[],
                public commands: GridCommand[] = [],
                public selectMode: GridSelectMode = GridSelectMode.None,
                public editable: boolean = false) {
    }
}

export class Page<T> {
    constructor(public content: T[], public total: number) {
    }
}

