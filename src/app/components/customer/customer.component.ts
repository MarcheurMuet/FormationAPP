import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Customer } from 'src/app/model/customer.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  myForm : FormGroup;

  constructor(public cartService: CartService, private router: Router) {
    let customer = this.cartService.getCustomer();
    this.myForm = new FormGroup({
      firstname : new FormControl(customer.firstname),
      lastname : new FormControl(customer.lastname),
      adress : new FormControl(customer.adress),
      mobile : new FormControl(customer.mobileNumber),
      mail : new FormControl(customer.mail)
    })

   }

  ngOnInit(): void {
   }

  onSaveCustomer(form : FormGroup) {
    if(form.valid){
      this.cartService.saveCustomer(new Customer(form.value.firstname,form.value.lastname,form.value.adress,form.value.mobile,form.value.mail));
      this.router.navigateByUrl('/order');        
    }
  }
}
