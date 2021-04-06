import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EmailComponent } from './email/email.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OrdersModule } from './orders/orders.module';

@NgModule({
    declarations: [
        AppComponent,
        EmailComponent,
        NotFoundComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        OrdersModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
