import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmailComponent } from './email/email.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DetailsComponent } from './orders/details/details.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
    { path: '', component: EmailComponent },
    { path: 'orders/:email', component: OrdersComponent },
    { path: 'order/:id', component: DetailsComponent },
    { path: '**', component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
