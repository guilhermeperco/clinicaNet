import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IConsultaClinic } from 'app/shared/model/consulta-clinic.model';

@Component({
    selector: 'jhi-consulta-clinic-detail',
    templateUrl: './consulta-clinic-detail.component.html'
})
export class ConsultaClinicDetailComponent implements OnInit {
    consulta: IConsultaClinic;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ consulta }) => {
            this.consulta = consulta;
        });
    }

    previousState() {
        window.history.back();
    }
}
