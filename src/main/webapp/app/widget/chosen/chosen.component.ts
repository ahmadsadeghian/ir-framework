import {AfterViewInit, Component, ElementRef, forwardRef, Inject, Input, OnInit} from "@angular/core";
import {ChosenOptions} from "./chosen-config";
import {Observable} from "rxjs/Observable";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
    selector: 'fw-chosen',
    templateUrl: './chosen.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ChosenComponent),
            multi: true
        }
    ]
})
export class ChosenComponent implements OnInit, AfterViewInit, ControlValueAccessor {
    @Input() placeHolder: string;
    @Input() dataTextField: string;
    @Input() dataValueField: string;
    @Input() dataGroupFiled: string;
    @Input() items: Observable<any[]>;
    @Input('value') _value = null;

    private chosenConfig: ChosenOptions = {
        no_results_text: 'موردی یافت نشد:',
        search_contains: true,
        allow_single_deselect: true
    };
    private elementRef: any;
    private list: any[] = [];

    onChange: any = () => {
    };
    onTouched: any = () => {
    };

    constructor(@Inject(ElementRef) elementRef: ElementRef) {
        this.elementRef = elementRef;
    }

    registerOnChange(fn) {
        this.onChange = fn;
    }

    registerOnTouched(fn) {
        this.onTouched = fn;
    }

    writeValue(value) {
        this._value = value;
        this.bind(value);
    }

    get value() {
        return this._value;
    }

    set value(val) {
        this._value = val;
        this.onChange(val);
        this.onTouched();
    }

    ngOnInit() {
        if (this.dataGroupFiled) {
            this.handleGroupedItems();
        } else {
            this.handleFlatItems();
        }
    }

    handleFlatItems() {
        this.items.subscribe(result => this.list = result);
    }


    bind(value: any): void {
        let select = $(this.elementRef.nativeElement).find("select");
        select.val(value);
        select.trigger("chosen:updated");
    }

    handleGroupedItems() {
        var groupBy = function (xs, key) {
            return xs.reduce(function (rv, x) {
                (rv[x[key]] = rv[x[key]] || []).push(x);
                return rv;
            }, {});
        };
        let temp: any[];
        this.items.subscribe(result => temp = groupBy(result, this.dataGroupFiled));
        for (var key in temp) {
            this.list.push({
                groupKey: key,
                items: temp[key]
            });
        }
    }

    ngAfterViewInit() {
        let select = $(this.elementRef.nativeElement).find("select");
        select.chosen(this.chosenConfig);
        select.on('change', (ev, e) => {
            this.value = select.val();
            //this.theText = select.text();
        });
    }

    getPlaceHolder() {
        if (this.placeHolder)
            return this.placeHolder;
        else
            return '...لطفا انتخاب کنید...';
    }
}
