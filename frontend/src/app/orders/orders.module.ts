import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { DetailsComponent } from './details/details.component';
import { LoadingComponent } from '../loading/loading.component';



@NgModule({
    declarations: [
        OrdersComponent,
        DetailsComponent,
        LoadingComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        OrdersComponent,
        DetailsComponent
    ]
})
export class OrdersModule { }
