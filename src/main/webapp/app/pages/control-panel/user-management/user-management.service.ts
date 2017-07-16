import {Injectable} from "@angular/core";
import {GenericService} from "../../../shared/generic-service";
import {User} from "./user-model";
import {Http} from "@angular/http";

@Injectable()
export class UserManagementService extends GenericService<User, number> {
    constructor(private http: Http) {
        super();
    }

    getResourceUrl(): string {
        console.log('here');
        return '/api/account';
    }

    getHttpService(): Http {
        return this.http;
    }

}