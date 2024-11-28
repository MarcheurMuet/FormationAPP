import { CartService } from 'src/app/services/cart.service';
import { User } from './model/user.model';
import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from './services/authenticate.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'trainingS-front-app';
  user: User | undefined;

  constructor(
    public authService: AuthenticateService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    console.log(this.authService.getUser());

    console.log(this.authService.isAdmin());

    this.user = this.authService.getUser();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('trainings');
    console.log('logout');
  }


  isHomePage(): boolean {
    return this.router.url === '/home';
  }

  get panierCount(): number {    return this.cartService.getCartCount();  }
}
