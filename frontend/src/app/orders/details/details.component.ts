import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
    public loading = true;
    public order: { [key: string]: any } | null = null;

    constructor(
        private api: ApiService,
        private activeRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        const orderId = this.activeRoute.snapshot.paramMap.get('id') || '';

        if (orderId.length) {
            this.api.getOrder(orderId)
                .then(data => { this.order = data.data; })
                .then(() => { this.loading = false; });
        } else {
            alert('Invalid order id');
            this.loading = false;
        }
    }
}
