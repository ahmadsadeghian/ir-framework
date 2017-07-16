import {Injectable} from "@angular/core";
import "rxjs/add/observable/of";
import "rxjs/add/operator/do";
import "rxjs/add/operator/delay";
import {Headers, Http, Response} from "@angular/http";
import {Observable} from "rxjs/Rx";

@Injectable()
export class AuthService {
    username: string = null;
    isLoggedIn: boolean;

    constructor(private http: Http) {
    }

    get(): Observable<any> {
        return this.http.get('api/account').map((res: Response) => res.json());
    }

    login(username: string, password: string): Promise<any> {
        const data = 'j_username=' + encodeURIComponent(username) +
            '&j_password=' + encodeURIComponent(password) +
            '&remember-me=' + false + '&submit=Login';
        const headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });

        return new Promise((resolve, reject) => {
            this.http.post('api/authentication', data, {headers})
                .subscribe(
                    result => this.handleLoginSuccess(username, result, resolve),
                    error => this.handleLoginError(error, reject)
                );
        });
    }

    private handleLoginSuccess(username, result, resolve): void {
        this.isLoggedIn = true;
        this.username = username;
        resolve(result);
    }

    private handleLoginError(error, reject): void {
        this.isLoggedIn = false;
        reject(error);
    }

    logout(): Observable<boolean> {
        return this.http.post('api/logout', {}).map(result => {
            console.log(result.status == 200);
            if (result.status == 200) {
                this.isLoggedIn = false;
                this.username = null;
                return true;
            } else {
                return false;
            }
        });
    }
}
