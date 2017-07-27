import {Component, OnInit} from "@angular/core";
import {User} from "./user-model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserManagementService} from "./user-management.service";
import {ValidationService} from "../../../shared/validation/validation-service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import "rxjs/add/operator/switchMap";

@Component({
    templateUrl: './update-user.html',
    providers: [],
})
export class UpdateUserComponent implements OnInit {
    constructor(private formBuilder: FormBuilder,
                private userService: UserManagementService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
    }

    private userForm: FormGroup;
    private validationService: ValidationService;
    private model: User = new User();

    ngOnInit(): void {
        this.userForm = this.formBuilder.group({
            'firstName': [this.model.firstName, Validators.required],
            'lastName': [this.model.lastName, Validators.required],
            'email': [this.model.email, [Validators.required, Validators.email]],
            'login': [this.model.login, Validators.required]
        });
        this.validationService = new ValidationService(this.userForm);
        this.activatedRoute.params
            .switchMap((params: Params) => this.userService.find(+params['id']))
            .subscribe((user: User) => this.userForm.patchValue(user));
    }

    onSubmit(): void {
        if (this.validationService.isValid()) {
            this.model = this.userForm.value;
            this.userService.update(this.model).add(result => {
                this.router.navigate(['/pages/control-panel/user-management']);
            });
        }
    }

    cancel(): void {
        this.router.navigate(['/pages/control-panel/user-management']);
    }

}
