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
                new GlobalCommand('جدید', 'fa fa-plus', this.add.bind(this)),
                new GridCommand('ویرایش', 'fa fa-edit', this.edit.bind(this)),
                new GridCommand('حذف', 'fa fa-remove', this.test.bind(this)),
                new GridCommand('تغییر کلمه عبور', 'fa fa-key', this.test.bind(this)),
                new GridCommand('انتساب به سازمان', 'fa fa-globe', this.test.bind(this)),
                new GridCommand('انتساب گروههای کاربری', 'fa fa-users', this.test.bind(this)),
                new GridCommand('قفل کردن', 'fa fa-lock', this.test.bind(this)),
                new GridCommand('باز کردن قفل', 'fa fa-unlock', this.test.bind(this)),
                new GridCommand('فعال سازی', 'fa fa-check', this.test.bind(this)),
                new GridCommand('غیر فعال سازی', 'fa fa-ban', this.test.bind(this)),
                new GridCommand('اخراج', 'fa fa-sign-out', this.test.bind(this)),
                new GridCommand('اعمال محدودیت', 'fa fa-exclamation', this.test.bind(this)),
            ],
            GridSelectMode.Single);
    }

    private test(arg: EventArgs<User>): void {
        this.router.navigate(['/pages/control-panel/user-management/user']);
    }

    private add() {
        this.router.navigate(['/pages/control-panel/user-management/create']);
    }

    private edit(e: EventArgs<User>) {
        this.router.navigate([`/pages/control-panel/user-management/update/${e.arg.id}`]);
    }
}
