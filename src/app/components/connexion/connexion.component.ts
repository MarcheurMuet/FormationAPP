import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './../../model/user.model';
import { AuthenticateService } from './../../services/authenticate.service';
import { ToastService } from 'angular-toastify';

/**
 * Composant de la page de connexion.
 * Permet à l'utilisateur de se connecter en validant ses informations de connexion.
 */

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

  /**
   * Constructeur du composant ConnexionComponent.
   * Initialise le formulaire avec les valeurs de l'utilisateur, récupérées du service d'authentification.
   * @param apiService Service pour interagir avec l'API
   * @param authService Service d'authentification
   * @param router Service de navigation
   * @param _toastService Service de notifications Toast pour afficher les messages de succès/erreur
   */
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

  /**
   * Méthode d'initialisation du composant.
   * Si l'utilisateur est déjà connecté, redirige vers la page des formations.
   */
  ngOnInit(): void {
    this.authService.isLogin() ? this.router.navigateByUrl('/trainings') : false;
  }

  /**
   * Méthode appelée lors de la soumission du formulaire de connexion.
   * Valide les informations et authentifie l'utilisateur.
   * @param userForm FormGroup contenant les valeurs du formulaire
   */
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
            this.router.navigate(['/cart']);
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

  /**
   * Affiche une notification de succès lorsque la connexion est réussie.
   */
  addInfoToastSuccessConnexion() {
    this._toastService.success('Connexion réussie');
  }

  /**
   * Affiche une notification d'échec lorsque le mot de passe est incorrect.
   */
  addInfoToastFailedConnexion() {
    this._toastService.error('Mot de passe incorrect, veuillez réessayer');
  }
}
