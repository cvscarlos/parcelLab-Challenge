import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../shared/api.service';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit {
    public loading = true;
    public orders: Array<any> = [];

    constructor(
        private api: ApiService,
        private activeRoute: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit(): void {
        const email = this.activeRoute.snapshot.paramMap.get('email') || '';

        if (email.length) {
            this.api.getOrdersByEmail(email)
                .then(data => { this.orders = data.data; })
                .finally(() => { this.loading = false; });
        } else {
            alert('Invalid email');
            this.loading = false;
        }
    }

    goToOrder(order: any) {
        this.router.navigate(['order', order.orderNo]);
    }

}
