import {Component, OnInit} from "@angular/core";
import {User} from "./user-model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserManagementService} from "./user-management.service";
import {ValidationService} from "../../../shared/validation/validation-service";


@Component({
    templateUrl: './user-form.html',
    providers: [],
})
export class UserFormComponent implements OnInit {
    constructor(private formBuilder: FormBuilder, private userService: UserManagementService) {
    }

    private userForm: FormGroup;
    private validationService: ValidationService;
    private model: User = new User();

    ngOnInit(): void {
        this.userForm = this.formBuilder.group({
            'firstName': [this.model.firstName, Validators.required],
            'lastName': [this.model.lastName, Validators.required],
            'email': [this.model.email, [Validators.required, Validators.email]],
            'login': [this.model.login, Validators.required],
            'password': [this.model.password, Validators.required],
            'passwordRepeat': [this.model.passwordRepeat, Validators.required]
        });
        this.validationService = new ValidationService(this.userForm);
    }


    private customValidator(control: FormControl) {
        // check if control is equal to the password1 control
        return {isEqual: control.value === this.userForm.controls['password'].value};
    }

    onSubmit(): void {
        if (this.validationService.isValid()) {
            this.model = this.userForm.value;
            this.userService.create(this.model).add(result => {
                console.log(result);
            });
        }
    }

}
