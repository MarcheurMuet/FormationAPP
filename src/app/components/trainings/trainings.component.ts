import { Training } from './../../model/training.model';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { ToastService } from 'angular-toastify';

/**
 * Composant pour afficher et gérer la liste des formations.
 * Permet d'ajouter des formations au panier, de les supprimer et de naviguer vers leur page de mise à jour.
 */

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css'],
})
export class TrainingsComponent implements OnInit {
  listTrainings: Training[] | undefined;
  error: string | undefined;

  /**
   * Constructeur du composant TrainingsComponent.
   * @param apiService Service pour interagir avec l'API et récupérer les données des formations
   * @param cartService Service pour gérer le panier
   * @param router Service pour la navigation dans l'application
   * @param authService Service pour gérer l'authentification des utilisateurs
   * @param _toastService Service pour afficher des notifications Toast
   */
  constructor(
    private apiService: ApiService,
    private cartService: CartService,
    private router: Router,
    public authService: AuthenticateService,
    private _toastService: ToastService
  ) {}


  ngOnInit(): void {
    this.getAllTrainings();
  }

  /**
   * Récupère toutes les formations via l'API.
   * Si une erreur survient, le message d'erreur est affiché.
   */
  getAllTrainings(): void {
    this.apiService.getTrainings().subscribe({
      next: (data) => (this.listTrainings = data),
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
  }

  /**
   * Ajoute une formation au panier si la quantité est supérieure à 0.
   * Affiche une notification de succès ou d'erreur selon le cas.
   * @param training La formation à ajouter au panier
   */
  onAddToCart(training: Training): void {
    if (training.quantity <= 0) {
      this.addInfoToastErrorQuantityTraining();
    } else {
      this.addInfoToastAddTraining();
      this.cartService.addTraining(training);
    }
    console.log('Article ajouté au panier :', training);
  }

  /**
   * Redirige vers la page de mise à jour de la formation.
   * @param training La formation à modifier
   */
  goToUpdate(training: Training): void {
    this.router.navigateByUrl(`/training/${training.id}`);
  }

  /**
   * Supprime une formation de la base de données et met à jour la liste affichée.
   * Affiche une notification Toast à la suppression.
   * @param training La formation à supprimer
   */
  deleteOneTraining(training: Training): void {
    this.apiService.deleteTraining(training.id).subscribe({
      next: () => {
        // Mise à jour de la liste des formations après suppression
        this.listTrainings = this.listTrainings?.filter((t) => t.id !== training.id);
        console.log('Formation supprimée avec succès');
      },
      error: (err) => (this.error = err.message),
      complete: () => (this.error = null),
    });
    this.addInfoToastDeleteTraining();
  }

  /**
   * Affiche une notification de succès lors de l'ajout d'une formation au panier.
   */
  addInfoToastAddTraining(): void {
    this._toastService.success('Article ajouté au panier');
  }

  /**
   * Affiche une notification d'erreur lorsque la quantité d'une formation est inférieure ou égale à zéro.
   */
  addInfoToastErrorQuantityTraining(): void {
    this._toastService.error('La quantité doit être supérieure à 0');
  }

  /**
   * Affiche une notification d'erreur lorsque la formation est supprimée de la base de données.
   */
  addInfoToastDeleteTraining(): void {
    this._toastService.error('Article supprimé de la base de données');
  }

  /**
   * Met à jour la quantité d'une formation et s'assure qu'elle soit supérieure ou égale à 0.
   * @param training La formation à mettre à jour
   */
  updateTotal(training: Training): void {
    if (training.quantity < 0) {
      training.quantity = 0;
    }
  }
}
