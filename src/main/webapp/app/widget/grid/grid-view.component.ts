import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import * as configs from "./grid-view-config";
import {EventArgs} from "./grid-view-config";
import {GridViewService} from "./grid-view.service";
import {GenericService} from "../../shared/generic-service";
import {EventBroadcaster} from "./grid-event-broadcaster";
import {Router} from "@angular/router";

@Component({
    selector: 'fw-grid-view',
    templateUrl: './grid-view.html',
    providers: [GridViewService],
})
export class GridViewComponent implements OnInit {
    constructor(private gridViewService: GridViewService,
                private eventBroadcaster: EventBroadcaster<any>,
                private router: Router) {
    }

    @Input() config: configs.GridConfig;
    @Input() crudService: GenericService<any, any>;
    @Input() filter: object;
    @Output() eventHandler = new EventEmitter<configs.EventArgs<any>>();

    private reversedColumns: configs.GridColumn[] = [];
    private rowCommands: configs.GridCommand[] = [];
    private globalCommands: configs.GlobalCommand[] = [];
    private items = [];
    private gridQuery = new configs.GridQuery(new configs.Pageable(0, 10), new configs.Sortable());
    private MULTI_SELECT = configs.GridSelectMode.Multiple;
    private SINGLE_SELECT = configs.GridSelectMode.Single;
    private columnsCount = 0;
    private selectedRows: any[] = [];

    private onSelectRowChanged(row: any): void {
        let idx = this.selectedRows.indexOf(row);
        if (idx == -1) {
            this.selectedRows.push(row);
        } else {
            this.selectedRows.splice(idx, 1);
        }
    }

    private isRowChecked(row: any): boolean {
        return this.selectedRows.indexOf(row) != -1;
    }

    ngOnInit() {
        this.getReverseColumns();
        this.getCommands();
        this.bind();
        this.handleBroadcast();
    }

    private handleBroadcast(): void {
        this.eventBroadcaster.subscribe((e: EventArgs<any>) => {
            if (e.eventName == 'rebind') {
                this.filter = e.arg;
                this.bind();
            }
        });
    }

    private getReverseColumns() {
        for (let i = this.config.columns.length - 1; i >= 0; i--) {
            if (this.config.columns[i].visible) {
                this.reversedColumns.push(this.config.columns[i]);
            }
        }
        this.reversedColumns.push(new configs.RowIndexColumn());
        this.columnsCount = this.reversedColumns.length;
    }

    private getCommands() {
        for (let i = 0; i < this.config.commands.length; i++) {
            if (this.config.commands[i].isGlobal) {
                this.globalCommands.push(this.config.commands[i]);
            } else {
                this.rowCommands.push(this.config.commands[i]);
            }
        }
    }

    private bind(): void {
        this.crudService.query(this.gridQuery, this.filter).subscribe(
            result => {
                this.items = result.content;
                this.gridQuery.total = result.total;
                let devide = this.gridQuery.total / this.gridQuery.pageable.size;
                this.gridQuery.numberOfPages = devide < 1 ? 1 : Math.floor(devide);
            }
        );
    }

    private handleCommand(command: configs.GridCommand, item: any): void {
        let eventArg = new configs.EventArgs(item);
        command.callback(eventArg);
        this.eventHandler.emit(eventArg);
    }

    private handleGlobalCommand(command: configs.GridCommand): void {
        let eventArg = new configs.EventArgs();
        command.callback(eventArg);
        this.eventHandler.emit(eventArg);
    }

    private setPageSize(pageSize: number): void {
        this.gridQuery.pageable.size = pageSize;
        this.bind();
    }

    private gotoPage(page: number): void {
        this.gridQuery.pageable.page = page;
        this.bind();
    }

    private getRowIndex(index): number {
        return this.gridQuery.pageable.page * this.gridQuery.pageable.size + index + 1;
    }

}