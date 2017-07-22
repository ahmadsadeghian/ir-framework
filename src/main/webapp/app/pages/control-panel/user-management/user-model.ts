/**
 * Created by reza on 26/06/2017.
 */

export class User {
    constructor(public id: number = -1,
                public login?: string,
                public firstName?: string,
                public lastName?: string,
                public email?: string,
                public isOnline?: boolean,
                public password?: string,
                public passwordRepeat?: string) {
    }
}