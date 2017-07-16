import {Component, OnInit} from "@angular/core";
import {User} from "./user-model";

@Component({
    templateUrl: './user-form.html',
    providers: [],
})
export class UserFormComponent implements OnInit {
    constructor() {
    }

    private model: User = new User();

    ngOnInit(): void {

    }

}
