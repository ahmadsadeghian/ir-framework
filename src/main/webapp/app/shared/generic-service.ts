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
        return this.getHttpService().post(`${this.getResourceUrl()}/query`, JSON.stringify(criteria))
            .map(r => {
                let j = r.json();
                return new Page<T>(j.content, j.totalElements)
            });
    }

    public create(model: T): Subscription {
        return this.getHttpService().post(this.getResourceUrl(), JSON.stringify(model))
            .subscribe(
                r => {
                    this.getNotificationService().success("عملیات با موفقیت انجام شد");
                    return r.json() as T
                },
                e => this.handleError(e)
            )
    }

    public update(model: T): Observable<T> {
        return this.getHttpService().put(this.getResourceUrl(), model).map(r => r.json() as T);
    }

    public delete(id: PK): Observable<boolean> {
        return this.getHttpService().delete(this.getResourceUrl(), id).map(r => r.json() as boolean);
    }

    public find(id: PK): Observable<T> {
        return this.getHttpService().get(`${this.getResourceUrl()}/${id}`).map(r => r.json() as T);
    }

    protected abstract getResourceUrl(): string;

    protected abstract getHttpService(): Http;

    protected abstract getNotificationService(): NotificationService;

    protected handleError(e) {
        let message = e.message || "خطا در انجام عملیات";
        this.getNotificationService().error(message);
        return Observable.never;
    }

}