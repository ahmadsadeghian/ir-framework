import {Component} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'login',
    templateUrl: './login.html',
    styleUrls: ['./login.scss']
})
export class Login {

    public form: FormGroup;
    public username: AbstractControl;
    public password: AbstractControl;

    private errorMessage = '';

    constructor(fb: FormBuilder, private authService: AuthService, private router: Router) {
        this.form = fb.group({
            'username': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'password': ['', Validators.compose([Validators.required])]
        });

        this.username = this.form.controls['username'];
        this.password = this.form.controls['password'];
    }

    public onSubmit(values: Object): void {
        if (this.form.valid) {
            this.authService.login(this.username.value, this.password.value).then(
                result => this.handleLoginSuccess(result),
                error => this.handleError(error)
            );
        }
    }

    private handleLoginSuccess(result): void {
        this.errorMessage = '';
        this.router.navigate(['/pages/dashboard']);
    }

    private handleError(e): void {
        let error: string = e.json().message;

        switch (error) {
            case 'Bad credentials':
                this.errorMessage = ' نام کاربری یا رمز عبور صحیح نمی باشد. ';
                break;
            default:
                this.errorMessage = ' خطا در ورود به سامانه، لطفا در صورت تکرار این پیغام با مدیریت سامانه تماس بگیرید. ';
                break;
        }
    }
}
