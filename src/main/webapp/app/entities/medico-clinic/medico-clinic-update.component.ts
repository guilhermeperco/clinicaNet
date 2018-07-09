import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IMedicoClinic } from 'app/shared/model/medico-clinic.model';
import { MedicoClinicService } from './medico-clinic.service';
import { IContatoClinic } from 'app/shared/model/contato-clinic.model';
import { ContatoClinicService } from 'app/entities/contato-clinic';

@Component({
    selector: 'jhi-medico-clinic-update',
    templateUrl: './medico-clinic-update.component.html'
})
export class MedicoClinicUpdateComponent implements OnInit {
    private _medico: IMedicoClinic;
    isSaving: boolean;

    contatoes: IContatoClinic[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private medicoService: MedicoClinicService,
        private contatoService: ContatoClinicService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ medico }) => {
            this.medico = medico;
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
        if (this.medico.id !== undefined) {
            this.subscribeToSaveResponse(this.medicoService.update(this.medico));
        } else {
            this.subscribeToSaveResponse(this.medicoService.create(this.medico));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMedicoClinic>>) {
        result.subscribe((res: HttpResponse<IMedicoClinic>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get medico() {
        return this._medico;
    }

    set medico(medico: IMedicoClinic) {
        this._medico = medico;
    }
}
