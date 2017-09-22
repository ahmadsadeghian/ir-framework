import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import {GridQuery, Page} from "../widget/grid/grid-view-config";
import {Http} from "@angular/http";
import {Subscription} from "rxjs/Subscription";
import {NotificationService} from "./notification-service";

export abstract class GenericService<T, PK> {
    public query(gridQuery: GridQuery, params: object): Observable<Page<T>> {
        let criteria = {
            page: gridQuery.pageable.page,
            size: gridQuery.pageable.size
        };
        for (var key in params) {
            criteria[key] = params[key];
        }
        return this.getHttpService()
            .post(`${this.getResourceUrl()}/query`, JSON.stringify(criteria))
            .map(r => {
                let j = r.json();
                return new Page<T>(j.content, j.totalElements)
            });
    }

    public create(model: T): Subscription {
        return this.getHttpService()
            .post(`${this.getResourceUrl()}/save`, JSON.stringify(model))
            .subscribe(
                r => {
                    this.getNotificationService().success();
                    return r.json() as T
                },
                e => this.handleError(e)
            )
    }

    public update(model: T): Subscription {
        return this.getHttpService()
            .put(`${this.getResourceUrl()}/update`, JSON.stringify(model))
            .subscribe(
                r => {
                    this.getNotificationService().success();
                    return r.json() as T
                },
                e => this.handleError(e)
            )
    }

    public delete(id: PK): Subscription {
        return this.getHttpService()
            .get(`${this.getResourceUrl()}/delete/${id}`)
            .subscribe(
                r => {
                    this.getNotificationService().success();
                    return r;
                },
                e => this.handleError(e)
            );
    }

    public find(id: PK): Observable<T> {
        return this.getHttpService()
            .get(`${this.getResourceUrl()}/${id}`)
            .map(r => r.json() as T);
    }

    protected abstract getResourceUrl(): string;

    protected abstract getHttpService(): Http;

    protected abstract getNotificationService(): NotificationService;

    protected handleError(e) {
        let message = e.message || NotificationService.ERROR_MESSAGE;
        this.getNotificationService().error(message);
        return Observable.never;
    }

}