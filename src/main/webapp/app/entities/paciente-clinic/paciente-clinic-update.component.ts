import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPacienteClinic } from 'app/shared/model/paciente-clinic.model';
import { PacienteClinicService } from './paciente-clinic.service';
import { IContatoClinic } from 'app/shared/model/contato-clinic.model';
import { ContatoClinicService } from 'app/entities/contato-clinic';

@Component({
    selector: 'jhi-paciente-clinic-update',
    templateUrl: './paciente-clinic-update.component.html'
})
export class PacienteClinicUpdateComponent implements OnInit {
    private _paciente: IPacienteClinic;
    isSaving: boolean;

    contatoes: IContatoClinic[];
    dataNascimentoDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private pacienteService: PacienteClinicService,
        private contatoService: ContatoClinicService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ paciente }) => {
            this.paciente = paciente;
        });
        this.contatoService.query().subscribe(
            (res: HttpResponse<IContatoClinic[]>) => {
                this.contatoes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.paciente.id !== undefined) {
            this.subscribeToSaveResponse(this.pacienteService.update(this.paciente));
        } else {
            this.subscribeToSaveResponse(this.pacienteService.create(this.paciente));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPacienteClinic>>) {
        result.subscribe((res: HttpResponse<IPacienteClinic>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackContatoById(index: number, item: IContatoClinic) {
        return item.id;
    }
    get paciente() {
        return this._paciente;
    }

    set paciente(paciente: IPacienteClinic) {
        this._paciente = paciente;
    }
}
