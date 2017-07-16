/**
 * Created by reza on 26/06/2017.
 */

export class User {
    constructor(public id?: number,
                public login?: string,
                public firstName?: string,
                public lastName?: string,
                public email?: string,
                public isOnline?: boolean) {
    }
}