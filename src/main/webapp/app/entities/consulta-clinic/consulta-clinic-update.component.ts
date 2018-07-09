import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IConsultaClinic } from 'app/shared/model/consulta-clinic.model';
import { ConsultaClinicService } from './consulta-clinic.service';
import { IPacienteClinic } from 'app/shared/model/paciente-clinic.model';
import { PacienteClinicService } from 'app/entities/paciente-clinic';
import { IMedicoClinic } from 'app/shared/model/medico-clinic.model';
import { MedicoClinicService } from 'app/entities/medico-clinic';

@Component({
    selector: 'jhi-consulta-clinic-update',
    templateUrl: './consulta-clinic-update.component.html'
})
export class ConsultaClinicUpdateComponent implements OnInit {
    private _consulta: IConsultaClinic;
    isSaving: boolean;

    pacientes: IPacienteClinic[];

    medicos: IMedicoClinic[];
    dataHoraDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private consultaService: ConsultaClinicService,
        private pacienteService: PacienteClinicService,
        private medicoService: MedicoClinicService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ consulta }) => {
            this.consulta = consulta;
        });
        this.pacienteService.query().subscribe(
            (res: HttpResponse<IPacienteClinic[]>) => {
                this.pacientes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.medicoService.query().subscribe(
            (res: HttpResponse<IMedicoClinic[]>) => {
                this.medicos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.consulta.id !== undefined) {
            this.subscribeToSaveResponse(this.consultaService.update(this.consulta));
        } else {
            this.subscribeToSaveResponse(this.consultaService.create(this.consulta));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IConsultaClinic>>) {
        result.subscribe((res: HttpResponse<IConsultaClinic>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackPacienteById(index: number, item: IPacienteClinic) {
        return item.id;
    }

    trackMedicoById(index: number, item: IMedicoClinic) {
        return item.id;
    }
    get consulta() {
        return this._consulta;
    }

    set consulta(consulta: IConsultaClinic) {
        this._consulta = consulta;
    }
}
