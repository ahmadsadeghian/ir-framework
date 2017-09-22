import {Injectable} from "@angular/core";
import {GenericService} from "../../../shared/generic-service";
import {User} from "./user.model";
import {Http} from "@angular/http";
import {NotificationService} from "../../../shared/notification-service";
import {Subscription} from "rxjs/Subscription";
import {ChangePasswordVM} from "./change-password/change-password.model";

@Injectable()
export class UserManagementService extends GenericService<User, number> {
    constructor(private http: Http, private notificationService: NotificationService) {
        super();
    }

    public resetPassword(model: ChangePasswordVM): Subscription {
        return this.http
            .post(this.getResourceUrl() + '/changePassword', JSON.stringify(model))
            .subscribe(
                r => this.getNotificationService().success(),
                e => this.handleError(e)
            )
    }

    getResourceUrl(): string {
        return '/api/user';
    }

    getHttpService(): Http {
        return this.http;
    }

    getNotificationService(): NotificationService {
        return this.notificationService;
    }

}