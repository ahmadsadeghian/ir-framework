import {Component, OnInit} from "@angular/core";
import {UserManagementService} from "../user-management.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import "rxjs/add/operator/switchMap";
import {ChangePasswordVM} from "./change-password.model";
import {User} from "../../../../shared/user/user.model";

@Component({
    templateUrl: './change-password.html',
    providers: [],
})
export class ChangePasswordComponent implements OnInit {
    constructor(private userService: UserManagementService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
    }

    private model: ChangePasswordVM;

    ngOnInit(): void {
        this.model = new ChangePasswordVM();
        this.activatedRoute.params
            .switchMap((params: Params) => this.userService.find(+params['id']))
            .subscribe((user: User) => this.model =
                new ChangePasswordVM(user.id, user.firstName, user.lastName, user.login));
    }

    onSubmit(): void {
        this.userService.resetPassword(this.model).add(result => {
            this.router.navigate(['/pages/control-panel/user-management']);
        });
    }

    cancel(): void {
        this.router.navigate(['/pages/control-panel/user-management']);
    }

}
