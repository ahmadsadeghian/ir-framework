export class ChangePasswordVM {
    constructor(public userId?: number,
                public firstName?: string,
                public lastName?: string,
                public login?: string,
                public password?: string,
                public passwordRepeat?: string,
                public resetOnLogin?: boolean) {
    }
}