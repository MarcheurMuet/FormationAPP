import { Injectable } from '@angular/core';
import { Training } from '../model/training.model';
import { Customer } from '../model/customer.model'; 


// Dire que c'est une injection et non une relation entre deux objets
// Le cart service fait l'injection et pour qu'on ait accès aux dépendances (type singleton) 

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  private cart : Map<number,Training>;
  private customer: Customer = {
    lastname: '',
    firstname: '',
    adress: '',
    mobileNumber: '',
    mail: '',
  };
  localStorageCart : string = 'cart';

  constructor() {
    let cartP = localStorage.getItem(this.localStorageCart);
    if (cartP) {
      this.cart = new Map(JSON.parse(cartP).map((item: any) => [item.id, item])); 
    } else {
      this.cart = new Map<number, Training>();
    }
  }

   addTraining(training : Training){
    this.cart.set(training.id, training);
    this.saveCart();
   }

   saveCustomer(customer : Customer){
    localStorage.setItem('customer', JSON.stringify(customer));
   }

   saveCart() {
    localStorage.setItem(this.localStorageCart, JSON.stringify(Array.from(this.cart.values())));
  }

   removeTraining(training : Training){
    this.cart.delete(training.id);
    this.saveCart();
   }

   getCart() : Training[] | undefined{
    if(this.cart.size > 0) {
      return Array.from(this.cart.values());
    }
    else return undefined;
   }

   getTotal() : number {
    let amount : number = 0;
    this.cart.forEach(training => {
      amount += training.price * training.quantity;
    });
    return amount;
   }

   getCustomer() : Customer {
    let customer = localStorage.getItem('customer');
    if(customer) return JSON.parse(customer);
    return new Customer("unknown","","","","");
   }

   clearLocalStorage(){
    this.cart.clear();
    localStorage.setItem(this.localStorageCart, ''); 

   }

   sendOrgerToLocaleStorage(){
    let order = { customer : this.getCustomer(), cart : this.getCart(), total : this.getTotal()};
    localStorage.setItem('order', JSON.stringify(order));
   }
}
