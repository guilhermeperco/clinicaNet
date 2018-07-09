import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPacienteClinic } from 'app/shared/model/paciente-clinic.model';

@Component({
    selector: 'jhi-paciente-clinic-detail',
    templateUrl: './paciente-clinic-detail.component.html'
})
export class PacienteClinicDetailComponent implements OnInit {
    paciente: IPacienteClinic;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ paciente }) => {
            this.paciente = paciente;
        });
    }

    previousState() {
        window.history.back();
    }
}
