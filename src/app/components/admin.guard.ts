import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticateService } from '../services/authenticate.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthenticateService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.isLogin() && this.authService.isAdmin()) {
      return true;
      // if (this.authService.isAdmin()) {
      //   this.router.navigate(['/admin']);
      //   return true;
      // } else if (this.authService.isUser()) {
      //   this.router.navigate(['/user']);
      //   return true;
      // }
      // return true;
    } else {
      this.router.navigate(['/connexion']);
      return false;
    }
  }
}
