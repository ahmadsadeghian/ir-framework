import {FormGroup} from "@angular/forms";

export class ValidationService {
    private messages: object;
    private formGroup: FormGroup;

    private messageItems = {
        'required': 'این فیلد اجباری می باشد',
        'email': 'فرمت ایمیل معتبر نمی باشد'
    };

    constructor(formGroup: FormGroup) {
        this.formGroup = formGroup;
        this.validate();
        this.formGroup.valueChanges.subscribe(data => this.validate());
    }

    private validate() {
        this.messages = {};
        for (let key in this.formGroup.controls) {
            let formControl = this.formGroup.controls[key];
            if (formControl && !formControl.valid) {
                let msgs = [];
                for (const error in formControl.errors) {
                    msgs.push(error);
                }
                this.messages[key] = msgs;
            }
        }
    }

    public getMessage(fieldName: string) {
        if (this.messages[fieldName]) {
            let result = '';
            for (let m of this.messages[fieldName]) {
                result += this.messageItems[m] + ' ';
            }
            return result;
        }
        return '';
    }

    public isValid(): boolean {
        return this.formGroup.valid;
    }

    public isFieldInvalid(fieldName): boolean {
        return !this.formGroup.controls[fieldName].valid;
    }

    public getInputClass(fieldName): string {
        if (this.isFieldInvalid(fieldName))
            return 'has-feedback has-error';
        else
            return 'has-feedback has-success'
    }

    public getInputIcon(fieldName): string {
        if (this.isFieldInvalid(fieldName))
            return 'ion-android-cancel form-control-feedback';
        else
            return 'ion-checkmark-circled form-control-feedback';
    }
}