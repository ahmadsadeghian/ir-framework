import {Component, OnInit} from "@angular/core";
import {User} from "../user.model";
import {EventBroadcaster} from "../../../../widget/grid/grid-event-broadcaster";
import {
    EventArgs,
    GlobalCommand,
    GridColumn,
    GridCommand,
    GridConfig,
    GridSelectMode,
    HiddenColumn
} from "../../../../widget/grid/grid-view-config";
import {Router} from "@angular/router";
import {UserManagementService} from "../user-management.service";

@Component({
    selector: 'user-grid',
    templateUrl: './user-grid.html',
})
export class UserGridComponent implements OnInit {

    constructor(private service: UserManagementService,
                private broadcaster: EventBroadcaster<User>,
                private router: Router) {
    }

    private userGridConfig: GridConfig;
    private searchFilter: User = new User();

    private onSearchUser(): void {
        this.broadcaster.broadcast(new EventArgs(this.searchFilter, 'rebind'));
    }

    ngOnInit(): void {
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
                new GridCommand('حذف', 'fa fa-remove', this.delete.bind(this)),
                new GridCommand('تغییر کلمه عبور', 'fa fa-key', this.changePassword.bind(this)),
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

    }

    private changePassword(e: EventArgs<User>) {
        this.router.navigate([`/pages/control-panel/user-management/change-password/${e.arg.id}`]);
    }

    private add() {
        this.router.navigate(['/pages/control-panel/user-management/create']);
    }

    private edit(e: EventArgs<User>) {
        this.router.navigate([`/pages/control-panel/user-management/update/${e.arg.id}`]);
    }

    private delete(e: EventArgs<User>) {
        this.service.delete(e.arg.id).add(result => {
            this.broadcaster.broadcast(new EventArgs(this.searchFilter, 'rebind'));
        });
    }

}