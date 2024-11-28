import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Training } from 'src/app/model/training.model';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { ToastService } from 'angular-toastify';

/**
 * Composant du panier.
 * Permet à l'utilisateur de voir, modifier et valider sa commande.
 */

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Training[] | undefined;
  total: number = 0;

  /**
   * Constructeur du composant CartComponent.
   * Initialise les services nécessaires pour gérer le panier, l'authentification et la navigation.
   * @param authService Service d'authentification
   * @param cartService Service de gestion du panier
   * @param router Service de navigation pour rediriger l'utilisateur
   * @param _toastService Service pour afficher des notifications
   */
  constructor(
    private authService: AuthenticateService, 
    private cartService: CartService, 
    private router: Router, 
    private _toastService: ToastService
  ) {}

  /**
   * Méthode d'initialisation du composant.
   * Charge les données du panier et calcule le total de la commande.
   */
  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.total = this.cartService.getTotal();
  }

  /**
   * Supprime un article du panier et met à jour la vue.
   * @param training L'objet Training à supprimer du panier
   */
  onRemoveFromCart(training: Training): void {
    this.addInfoToastDeleteTraining();
    this.cartService.removeTraining(training); 
    this.cart = this.cartService.getCart(); 
    this.total = this.cartService.getTotal();
  }

  /**
   * Gère la validation de la commande.
   * Si l'utilisateur est connecté, redirige vers la page de saisie des informations client.
   * Sinon, redirige vers la page de connexion.
   */
  order(): void {
    if (this.authService.getUser().email) {
      this.router.navigateByUrl('customer');
    } else {
      this.router.navigateByUrl('connexion');
    }
  }

  /**
   * Vide le panier et met à jour la vue.
   * Affiche une confirmation avant de supprimer tous les articles.
   */
  clearCart(): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer tous les articles du panier ?")) {
      this.cartService.clearLocalStorage(); 
      this.cart = this.cartService.getCart();
      this.total = this.cartService.getTotal(); 
      this._toastService.success('Le panier a été vidé'); 
    }
  }

  /**
   * Affiche une notification indiquant qu'un article a été supprimé du panier.
   */
  addInfoToastDeleteTraining(): void {
    this._toastService.success('Article supprimé');
  }
}
