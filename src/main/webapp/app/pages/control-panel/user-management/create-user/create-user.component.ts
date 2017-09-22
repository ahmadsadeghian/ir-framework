import {Component, OnInit} from "@angular/core";
import {User} from "../user.model";
import {UserManagementService} from "../user-management.service";
import {ActivatedRoute, Router} from "@angular/router";
import "rxjs/add/operator/switchMap";

@Component({
    templateUrl: './create-user.html',
    providers: [],
})
export class CreateUserComponent implements OnInit {
    constructor(private userService: UserManagementService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
    }

    model: User = new User();

    ngOnInit(): void {
    }

    onSubmit(): void {
        this.userService.create(this.model).add(result => {
            this.router.navigate(['/pages/control-panel/user-management']);
        });
    }

    cancel(): void {
        this.router.navigate(['/pages/control-panel/user-management']);
    }

}
