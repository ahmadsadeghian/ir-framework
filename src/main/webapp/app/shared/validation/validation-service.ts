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
            let result = '<ul>';
            for (let m of this.messages[fieldName]) {
                result += `<li>${this.messageItems[m]}</li>`;
            }
            result += '</ul>';
            return result;
        }
        return '';
    }

    public isValid(): boolean {
        this.validate();
        return this.formGroup.valid;
    }

    public isFieldInvalid(fieldName): boolean {
        return !this.formGroup.controls[fieldName].valid &&
            (this.formGroup.controls[fieldName].dirty || this.formGroup.controls[fieldName].touched);
    }
}