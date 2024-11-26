import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
 import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrainingsComponent } from './components/trainings/trainings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartService } from './services/cart.service';
import { CartComponent } from './components/cart/cart.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CommonModule } from '@angular/common'; 
import { OrderComponent } from './components/order/order.component';
import { ModalOrderComponent } from './components/order/modal-order/modal-order.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import { TrainingComponent } from './components/training/training.component';
import { CurrencyAfterPipe } from './currency-after.pipe';
import { ToastService, AngularToastifyModule } from 'angular-toastify'; 

@NgModule({
  declarations: [
    AppComponent,
    TrainingsComponent,
    CartComponent,
    CustomerComponent,    
    OrderComponent, 
    ModalOrderComponent, 
    ConnexionComponent, AdminComponent, UserComponent, TrainingComponent, CurrencyAfterPipe, 
    CurrencyAfterPipe  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularToastifyModule
  ],
  providers: [CartService,ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
