import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { CustomerComponent } from './components/customer/customer.component';
import { OrderComponent } from './components/order/order.component';
import { TrainingsComponent } from './components/trainings/trainings.component';
import { UserComponent } from './components/user/user.component';
import { AdminComponent } from './components/admin/admin.component';
import { TrainingComponent } from './components/training/training.component';

const routes: Routes = [
  { path: 'trainings', component: TrainingsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'order', component: OrderComponent },
  {
    path: 'training/:trainingId',
    component: TrainingComponent,
  },
  { path: 'connexion', component: ConnexionComponent },
  { path: '', redirectTo: 'trainings', pathMatch: 'full' },
  { path: '**', redirectTo: 'connexion' },
  { path: 'admin', component : AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
