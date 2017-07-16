import {Headers, RequestOptions} from "@angular/http";

let jsonHeader = new Headers({'Content-Type': 'application/json'});
export let jsonHttpOptions = new RequestOptions({headers: jsonHeader});


let encodedHeader = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
export let encodedHttpOptions = new RequestOptions({headers: encodedHeader});
