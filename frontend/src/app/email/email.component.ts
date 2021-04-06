import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-email',
    templateUrl: './email.component.html'
})
export class EmailComponent implements OnInit {

    constructor(
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    submit(form: FormGroup) {
        const email = (form.value.email || '').trim();
        if (!email.length) {
            return alert('Invalid email');
        }

        this.router.navigate(['orders', email]);
    }
}
