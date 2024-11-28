import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Training } from 'src/app/model/training.model';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Training[] | undefined;
  total: number = 0;
  constructor(private authService : AuthenticateService, private cartService: CartService, private router : Router,private _toastService: ToastService
  ) {
    
   }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.total = this.cartService.getTotal(); 
  }

  /*
  Supprime un article du panier
  */
  onRemoveFromCart(training: Training) {
    this.addInfoToastDeleteTraining();
    this.cartService.removeTraining(training);
    this.cart = this.cartService.getCart(); 
  }

  /*
  Passer commande
  */
  
  order(): void{
    if(this.authService.getUser().email){

      this.router.navigateByUrl('customer');
    } else{
      this.router.navigateByUrl('connexion');
    }
  }

  
  clearCart(): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer tous les articles du panier ?")) {
      this.cartService.clearLocalStorage();
      this.cart = this.cartService.getCart();
      this.total = this.cartService.getTotal();
      this._toastService.success('Le panier a été vidé');
    }
  }

  addInfoToastDeleteTraining() {
    this._toastService.success('Article supprimé');
  }
}
