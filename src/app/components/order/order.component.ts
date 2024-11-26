import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Training } from 'src/app/model/training.model';
import { Customer } from 'src/app/model/customer.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  showModal=false;
  modalTitle='Commande confirmée';
  modalContent= 'Votre commande a bien été prise en compte, merci de nous avoir donné :';
  modalData: any;

  customer: Customer | undefined;
  cart: Training[] = [];
  total: number = 0;
  orderDate: string = new Date().toLocaleDateString();

  constructor(public cartService: CartService, private router : Router) {}

  ngOnInit(): void {
    this.customer = this.cartService.getCustomer(); 
    this.cart = this.cartService.getCart();
  }

  onOrder(){

  }

  confirmOrder(): void {
    this.modalData = this.cartService.getTotal();
    this.showModal = true;
      
  }  

  onModalClose(): void{
    this.showModal = false;
    this.cartService.clearLocalStorage();
    this.router.navigateByUrl('');
    console.log("Back to the future ! ");
  }
}
