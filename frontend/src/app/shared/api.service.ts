import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface ApiResponse {
    errors: string[];
    meta: { [key: string]: any };
};
interface ApiResponseSingle extends ApiResponse {
    data: { [key: string]: any } | null;
};
interface ApiResponseMultiple extends ApiResponse {
    data: [];
};

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private server = 'http://localhost:3000/';

    constructor(
        private http: HttpClient,
    ) { }

    getOrdersByEmail(email: string) {
        return this.sendRequest('orders/' + email) as Promise<ApiResponseMultiple>;
    }

    getOrder(orderId: string) {
        return this.sendRequest('order/' + orderId) as Promise<ApiResponseSingle>;
    }

    private sendRequest(endpoint: string) {
        const clientRequest = this.http.get(this.server + endpoint).toPromise();
        clientRequest.catch(e => {
            alert('Server error');
            console.error(e);
        });
        return clientRequest;
    }
}
