import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './../../model/user.model';
import { AuthenticateService } from './../../services/authenticate.service';
import { ToastService } from 'angular-toastify';
@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
})
export class ConnexionComponent implements OnInit {
  user: User = new User('', '');
  errorMessage: string | null = null;
  userForm: FormGroup;
  password: string | undefined;

  constructor(
    private apiService: ApiService,
    private authService: AuthenticateService,
    private router: Router,
    private _toastService: ToastService
  ) {
    let user = this.authService.getUser() || new User('', '');
    this.userForm = new FormGroup({
      email: new FormControl(user.email),
      password: new FormControl(user.password),
    });
  }

  ngOnInit(): void {
    this.authService.isLogin()
      ? this.router.navigateByUrl('/trainings')
      : false;
  }

  onSubmit(userForm: FormGroup): void {
    if (this.userForm.valid) {
      this.apiService.getUser(userForm.value.email).subscribe(async (data) => {
        var password = await data[0].password;
        const isPassword = this.authService.authComparePassword(
          userForm.value.password,
          password
        );
        if (isPassword) {
          this.addInfoToastSuccessConnexion();
          this.authService.setUser(
            new User(data[0].email, data[0].password, data[0].roles)
          );
          if (this.authService.isAdmin()) {
            this.router.navigate(['/admin']);
          } else if (this.authService.isUser()) {
            this.router.navigate(['/trainings']);
          }
        } else {
          this.addInfoToastFailedConnexion();

          this.errorMessage = 'Email ou mot de passe incorrect';
        }
      });
    } else {
      this.errorMessage = 'Veuillez remplir le formulaire correctement.';
    }
  }

  addInfoToastSuccessConnexion() {
    this._toastService.success('Connexion réussie');
  }

  addInfoToastFailedConnexion() {
    this._toastService.error('Mot de passe incorrect, veuillez réessayer');
  }
}
