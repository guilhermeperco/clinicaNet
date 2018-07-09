import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IContatoClinic } from 'app/shared/model/contato-clinic.model';
import { ContatoClinicService } from './contato-clinic.service';

@Component({
    selector: 'jhi-contato-clinic-update',
    templateUrl: './contato-clinic-update.component.html'
})
export class ContatoClinicUpdateComponent implements OnInit {
    private _contato: IContatoClinic;
    isSaving: boolean;

    constructor(private contatoService: ContatoClinicService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ contato }) => {
            this.contato = contato;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.contato.id !== undefined) {
            this.subscribeToSaveResponse(this.contatoService.update(this.contato));
        } else {
            this.subscribeToSaveResponse(this.contatoService.create(this.contato));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IContatoClinic>>) {
        result.subscribe((res: HttpResponse<IContatoClinic>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get contato() {
        return this._contato;
    }

    set contato(contato: IContatoClinic) {
        this._contato = contato;
    }
}
