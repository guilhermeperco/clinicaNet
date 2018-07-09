import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMedicoClinic } from 'app/shared/model/medico-clinic.model';

@Component({
    selector: 'jhi-medico-clinic-detail',
    templateUrl: './medico-clinic-detail.component.html'
})
export class MedicoClinicDetailComponent implements OnInit {
    medico: IMedicoClinic;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ medico }) => {
            this.medico = medico;
        });
    }

    previousState() {
        window.history.back();
    }
}
