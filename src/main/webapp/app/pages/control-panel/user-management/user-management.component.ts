import {Component, OnInit} from "@angular/core";

import {
    EventArgs,
    GlobalCommand,
    GridColumn,
    GridCommand,
    GridConfig,
    GridSelectMode,
    HiddenColumn
} from "../../../widget/grid/grid-view-config";
import {UserManagementService} from "./user-management.service";
import {User} from "./user-model";
import {Router} from "@angular/router";

@Component({
    templateUrl: './user-management.html',
    providers: [UserManagementService],
})
export class UserManagementComponent implements OnInit {
    constructor(private service: UserManagementService, private router: Router) {
    }

    private userGridConfig: GridConfig;

    private searchFilter: User = new User();

    ngOnInit(): void {
        this.bindUserGrid();


    }

    private bindUserGrid(): void {
        this.userGridConfig = new GridConfig(
            [
                new HiddenColumn('id'),
                new GridColumn('firstName', 'نام', '200px'),
                new GridColumn('lastName', 'نام خانوادگی', '200px'),
                new GridColumn('login', 'نام کاربری', '200px'),
                new GridColumn('email', 'پست الکترونیکی', '200px')
            ],
            [
                new GlobalCommand('ADD', 'جدید', 'fa fa-plus'),
                new GridCommand('EDIT', 'ویرایش', 'fa fa-edit'),
                new GridCommand('DELETE', 'حذف', 'fa fa-remove'),
                new GridCommand('RESET_PASSWORD', 'تغییر کلمه عبور', 'fa fa-key'),
                new GridCommand('ORGANIZATIONS', 'انتساب به سازمان', 'fa fa-globe'),
                new GridCommand('GROUPS', 'انتساب گروههای کاربری', 'fa fa-users'),
                new GridCommand('LOCK', 'قفل کردن', 'fa fa-lock'),
                new GridCommand('UNLOCK', 'باز کردن قفل', 'fa fa-unlock'),
                new GridCommand('ACTIVATE', 'فعال سازی', 'fa fa-check'),
                new GridCommand('DEACTIVATE', 'غیر فعال سازی', 'fa fa-ban'),
                new GridCommand('LOGOUT', 'اخراج', 'fa fa-sign-out'),
                new GridCommand('RESTRICTIONS', 'اعمال محدودیت', 'fa fa-exclamation'),
            ],
            GridSelectMode.Single);
    }


    private onGridEvent(arg: EventArgs): void {

        switch (arg.eventName) {
            case 'ADD':
                this.router.navigate(['/pages/control-panel/user-management/new']);
                break;
        }
    }

}
