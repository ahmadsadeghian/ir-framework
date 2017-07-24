import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "./user-model";
import {EventBroadcaster} from "../../../widget/grid/grid-event-broadcaster";
import {EventArgs} from "../../../widget/grid/grid-view-config";

@Component({
    selector: 'user-search',
    templateUrl: './user-search.html',
})
export class UserSearchComponent implements OnInit {

    constructor(private broadcaster: EventBroadcaster<User>,
                private formBuilder: FormBuilder) {
    }

    private userSearchForm: FormGroup;
    private searchFilter: User = new User();

    buildSearchForm(): void {
        this.userSearchForm = this.formBuilder.group({
            'firstName': [this.searchFilter.firstName],
            'lastName': [this.searchFilter.lastName],
            'email': [this.searchFilter.email],
            'login': [this.searchFilter.login]
        });
    }

    ngOnInit(): void {
        this.buildSearchForm();
    }

    private onSearchUser(): void {
        this.searchFilter = this.userSearchForm.value;
        this.broadcaster.broadcast(new EventArgs(this.searchFilter, 'rebind'));
    }

}