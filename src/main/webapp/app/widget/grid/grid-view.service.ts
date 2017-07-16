import {Injectable} from "@angular/core";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import {Http} from "@angular/http";

@Injectable()
export class GridViewService {
    constructor(private http: Http) {
    }
}