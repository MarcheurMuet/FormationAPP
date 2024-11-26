import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticateService } from '../services/authenticate.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthenticateService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.isLogin() && this.authService.isUser()) {
      return true;
    } else {
      this.router.navigate(['/connexion']);
      return false;
    }
  }
}
