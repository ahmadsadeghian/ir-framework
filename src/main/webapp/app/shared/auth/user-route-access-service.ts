import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from "@angular/router";
import {Principal} from "./principal.service";
import {StateStorageService} from "./state-storage.service";
import {AuthService} from "../../auth.service";

@Injectable()
export class UserRouteAccessService implements CanActivate, CanActivateChild {

    constructor(private router: Router,
                private authService: AuthService,
                private stateStorageService: StateStorageService) {
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
        return this.checkLogin(childRoute, state);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
        return this.checkLogin(route, state);
    }

    checkLogin(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
        const authorities = route.data['authorities'];
        if (!authorities || authorities.length === 0) {
            return true;
        }

        this.authService.get().subscribe(result => {
            if (result.status == 200)
                return true;
            else {
                this.stateStorageService.storeUrl(state.url);
                this.router.navigate(['/login']);
                return false;
            }
        });
    }
}
