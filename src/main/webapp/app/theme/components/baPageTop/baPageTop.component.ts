import {Component} from "@angular/core";

import {GlobalState} from "../../../global.state";
import {Router} from "@angular/router";
import {AuthService} from "../../../auth.service";

@Component({
    selector: 'ba-page-top',
    templateUrl: './baPageTop.html',
    styleUrls: ['./baPageTop.scss'],
    providers: [AuthService]
})
export class BaPageTop {

    public isScrolled: boolean = false;
    public isMenuCollapsed: boolean = false;

    constructor(private _state: GlobalState, private  authService: AuthService, private router: Router) {
        this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
            this.isMenuCollapsed = isCollapsed;
        });
    }

    public toggleMenu() {
        this.isMenuCollapsed = !this.isMenuCollapsed;
        this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
        return false;
    }

    public scrolledChanged(isScrolled) {
        this.isScrolled = isScrolled;
    }

    private signOut() {
        this.authService.logout().subscribe(result => {
            if (result == true) {
                this.router.navigate(['/login']);
            }
        })
    }
}
