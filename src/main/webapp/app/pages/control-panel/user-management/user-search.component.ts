import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "./user-model";
import {EventBroadcaster} from "../../../widget/grid/grid-event-broadcaster";
import {EventArgs} from "../../../widget/grid/grid-view-config";

@Component({
    selector: 'user-search',
    templateUrl: './user-search.html',
})
export class UserSearchComponent implements OnInit {

    constructor(private broadcaster: EventBroadcaster,
                private formBuilder: FormBuilder) {
    }

    private userStatusList: Observable<any[]>;
    private userSearchForm: FormGroup;
    private searchFilter: User = new User();

    buildSearchForm(): void {
        this.userSearchForm = this.formBuilder.group({
            'firstName': [this.searchFilter.firstName],
            'lastName': [this.searchFilter.lastName],
            'email': [this.searchFilter.email],
            'login': [this.searchFilter.login],
            'isOnline': [this.searchFilter.isOnline]
        });

        this.userSearchForm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    ngOnInit(): void {
        this.bindUserStatusChosen();
        this.buildSearchForm();
    }

    onValueChanged(data?: any) {
        if (!this.userSearchForm) {
            return;
        }
        const form = this.userSearchForm;
    }

    private onSearchUser(): void {
        this.searchFilter = this.userSearchForm.value;
        this.broadcaster.broadcast(new EventArgs('rebind', this.searchFilter));
    }

    private bindUserStatusChosen(): void {
        this.userStatusList = Observable.of([
            {value: false, label: "آفلاین"},
            {value: true, label: "آنلاین"},
            {value: null, label: "همه موارد"}]);
    }
}