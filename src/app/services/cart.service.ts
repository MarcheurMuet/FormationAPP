import { Injectable } from '@angular/core';
import { Training } from '../model/training.model';
import { Customer } from '../model/customer.model';

/**
 * Service de gestion du panier d'achats.
 * Ce service gère l'ajout, la suppression, la récupération des articles dans le panier,
 * ainsi que la gestion des informations du client et du total du panier.
 */


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart : Map<number, Training>;
  private customer: Customer = {
    lastname: '',
    firstname: '',
    adress: '',
    mobileNumber: '',
    mail: '',
  };
  localStorageCart : string = 'cart';

  /**
   * Le constructeur initialise le service en récupérant le panier depuis le localStorage,
   * ou en créant un panier vide si aucun panier n'est trouvé.
   */
  constructor() {
    let cartP = localStorage.getItem(this.localStorageCart);
    if (cartP) {
      this.cart = new Map(JSON.parse(cartP).map((item: any) => [item.id, item]));
    } else {
      this.cart = new Map<number, Training>();
    }
  }

  /**
   * Ajoute un article dans le panier.
   * @param training L'article à ajouter ou mettre à jour dans le panier.
   */

addTraining(training: Training) {
  if (this.cart.has(training.id)) {
    const existingTraining = this.cart.get(training.id);
    if (existingTraining) {
      existingTraining.quantity += training.quantity; 
      this.cart.set(training.id, existingTraining);
    }
  } else {
    this.cart.set(training.id, training);
  }
  this.saveCart();
}

  

  /**
   * Sauvegarde les informations du client dans le localStorage.
   * @param customer L'objet client à sauvegarder.
   */
  saveCustomer(customer: Customer) {
    localStorage.setItem('customer', JSON.stringify(customer));
  }

  /**
   * Sauvegarde le panier dans le localStorage.
   */
  saveCart() {
    localStorage.setItem(this.localStorageCart, JSON.stringify(Array.from(this.cart.values())));
  }

  /**
   * Supprime un article du panier.
   * @param training L'article à supprimer du panier.
   */
  removeTraining(training: Training) {
    this.cart.delete(training.id);
    this.saveCart();
  }

  /**
   * Récupère la liste des articles dans le panier.
   * @returns Une liste d'articles ou `undefined` si le panier est vide.
   */
  getCart(): Training[] | undefined {
    if (this.cart.size > 0) {
      return Array.from(this.cart.values());
    } else {
      return undefined;
    }
  }

  /**
   * Calcule le montant total du panier.
   * @returns Le montant total du panier.
   */
  getTotal(): number {
    let amount: number = 0;
    this.cart.forEach(training => {
      amount += training.price * training.quantity;
    });
    return amount;
  }

  /**
   * Récupère les informations du client depuis le localStorage.
   * @returns L'objet Customer contenant les informations du client.
   */
  getCustomer(): Customer {
    let customer = localStorage.getItem('customer');
    if (customer) {
      return JSON.parse(customer);
    }
    return new Customer("unknown", "", "", "", "");
  }

  /**
   * Vide le panier et le localStorage.
   */
  clearLocalStorage() {
    this.cart.clear();
    localStorage.setItem(this.localStorageCart, '');
  }

  /**
   * Sauvegarde la commande dans le localStorage, incluant le panier et les informations du client.
   */
  sendOrderToLocalStorage() {
    let order = { customer: this.getCustomer(), cart: this.getCart(), total: this.getTotal() };
    localStorage.setItem('order', JSON.stringify(order));
  }

  /**
   * Récupère le nombre total d'articles dans le panier.
   * @returns Le nombre total d'articles dans le panier.
   */

  getCartCount(): number {
    let totalQuantity = 0;
    this.cart.forEach(training => {
      totalQuantity += training.quantity;
    });
    return totalQuantity;
  }
}
