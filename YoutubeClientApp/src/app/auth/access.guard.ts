import { inject } from "@angular/core"
import { LoginService } from "./services/login.service"
import { Router } from "@angular/router";

export const canActivateAuth = () => {
    const isLoggedIn = inject(LoginService).getObject('authData');

    if (isLoggedIn) { return true }

    return inject(Router).createUrlTree(['login'])
}