import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Training } from 'src/app/model/training.model';
import { Customer } from 'src/app/model/customer.model';
import { Router } from '@angular/router';

/**
 * Composant pour afficher et gérer la commande d'un utilisateur.
 * Permet de visualiser les informations du client, le récapitulatif du panier et de confirmer la commande.
 */
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  // Modal de confirmation de commande
  showModal = false;
  modalTitle = 'Commande confirmée';
  modalContent = 'Votre commande a bien été prise en compte, merci de nous avoir donné :';
  modalData: any;

  // Informations sur le client et le panier
  customer: Customer | undefined;
  cart: Training[] = [];
  total: number = 0;
  orderDate: string = new Date().toLocaleDateString();

  /**
   * Constructeur du composant OrderComponent.
   * @param cartService Service de gestion du panier.
   * @param router Service de navigation.
   */
  constructor(public cartService: CartService, private router: Router) {}

  /**
   * Méthode d'initialisation du composant.
   * Récupère les informations du client, le panier et met à jour le total.
   */

  ngOnInit(): void {
    this.customer = this.cartService.getCustomer(); 
    this.cart = this.cartService.getCart();  
    this.updateTotal(); 
  }

  /**
   * Met à jour le total du panier en appelant la méthode getTotal du service CartService.
   */

  updateTotal(): void {
    this.total = this.cartService.getTotal();  
  }

  /**
   * Méthode appelée lorsque l'utilisateur confirme sa commande.
   * Affiche le total de la commande dans une fenêtre modale.
   */
  
  confirmOrder(): void {
    this.modalData = this.cartService.getTotal();  
    this.showModal = true; 
  }  

  /**
   * Méthode appelée pour fermer la modale de confirmation.
   * Efface le panier et redirige l'utilisateur vers la page d'accueil.
   */
  onModalClose(): void {
    this.showModal = false;  
    this.cartService.clearLocalStorage();  
    this.router.navigateByUrl('/trainings');
    console.log("Back to the future ! ");
  }
}
