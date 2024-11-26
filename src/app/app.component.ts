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

  constructor(
    public authService: AuthenticateService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log(this.authService.getUser());

    console.log(this.authService.isAdmin());
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('trainings');
    console.log('logout');
  }
}
