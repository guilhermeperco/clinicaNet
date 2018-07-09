import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IContatoClinic } from 'app/shared/model/contato-clinic.model';

@Component({
    selector: 'jhi-contato-clinic-detail',
    templateUrl: './contato-clinic-detail.component.html'
})
export class ContatoClinicDetailComponent implements OnInit {
    contato: IContatoClinic;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ contato }) => {
            this.contato = contato;
        });
    }

    previousState() {
        window.history.back();
    }
}
