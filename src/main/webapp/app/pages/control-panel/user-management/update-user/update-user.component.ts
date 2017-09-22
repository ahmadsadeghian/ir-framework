import {Component, OnInit} from "@angular/core";
import {User} from "../user.model";
import {UserManagementService} from "../user-management.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import "rxjs/add/operator/switchMap";

@Component({
    templateUrl: './update-user.html',
    providers: [],
})
export class UpdateUserComponent implements OnInit {
    constructor(private userService: UserManagementService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
    }

    private model: User = new User();
    private id: number;

    ngOnInit(): void {
        this.activatedRoute.params
            .switchMap((params: Params) => this.userService.find(+params['id']))
            .subscribe((user: User) => this.model = user);
    }

    onSubmit(): void {
        this.userService.update(this.model).add(result => {
            this.router.navigate(['/pages/control-panel/user-management']);
        });
    }

    cancel(): void {
        this.router.navigate(['/pages/control-panel/user-management']);
    }

}
