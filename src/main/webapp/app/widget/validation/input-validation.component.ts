import {Component, Input, OnInit} from "@angular/core";

@Component({
    selector: 'fw-input-validation',
    templateUrl: './input-validation.html',
})
export class InputValidationComponent implements OnInit {
    @Input() describedBy: string;
    @Input() binding: any;

    ngOnInit(): void {
    }

    public getInputIcon(): string {
        let container = $(`[name=${this.binding.name}`).parent();
        if (this.binding.pristine) {
            container.removeClass('has-feedback');
            container.removeClass('has-error');
            container.removeClass('has-success');
            return '';
        }
        else if (!this.binding.valid) {
            container.addClass('has-feedback has-error');
            return '';
        }
        else {
            container.addClass('has-feedback has-success');
            return '';
        }
    }
}