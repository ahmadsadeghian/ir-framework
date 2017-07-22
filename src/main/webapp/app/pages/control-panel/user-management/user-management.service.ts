import {Injectable} from "@angular/core";
import {GenericService} from "../../../shared/generic-service";
import {User} from "./user-model";
import {Http} from "@angular/http";
import {NotificationService} from "../../../shared/notification-service";

@Injectable()
export class UserManagementService extends GenericService<User, number> {
    constructor(private http: Http, private notificationService: NotificationService) {
        super();
    }

    getResourceUrl(): string {
        return '/api/account';
    }

    getHttpService(): Http {
        return this.http;
    }

    getNotificationService(): NotificationService {
        return this.notificationService;
    }
}