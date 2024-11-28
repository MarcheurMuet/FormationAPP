import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Customer } from 'src/app/model/customer.model';
import { FormControl, FormGroup } from '@angular/forms';

/**
 * Composant pour la gestion des informations du client.
 * Permet à l'utilisateur de modifier ses informations et de les sauvegarder dans le service de panier.
 */
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  myForm: FormGroup;

  /**
   * Constructeur du composant CustomerComponent.
   * Initialise le formulaire avec les informations actuelles du client.
   * @param cartService Service pour accéder et gérer les données du panier.
   * @param router Service de navigation pour rediriger l'utilisateur.
   */
  
  constructor(public cartService: CartService, private router: Router) {
    let customer = this.cartService.getCustomer();
    this.myForm = new FormGroup({
      firstname: new FormControl(customer.firstname),
      lastname: new FormControl(customer.lastname),
      adress: new FormControl(customer.adress),
      mobile: new FormControl(customer.mobileNumber),
      mail: new FormControl(customer.mail)
    });
  }

  ngOnInit(): void {}

  /**
   * Méthode appelée lors de la soumission du formulaire pour sauvegarder les informations du client.
   * Si le formulaire est valide, les données sont sauvegardées et l'utilisateur est redirigé vers la page de commande.
   * @param form FormGroup contenant les valeurs du formulaire.
   */
  onSaveCustomer(form: FormGroup): void {
    if (form.valid) {
      this.cartService.saveCustomer(new Customer(form.value.firstname, form.value.lastname, form.value.adress, form.value.mobile, form.value.mail));
      this.router.navigateByUrl('/order');
    }
  }
}
