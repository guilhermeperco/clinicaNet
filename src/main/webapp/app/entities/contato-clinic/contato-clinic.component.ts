import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IContatoClinic } from 'app/shared/model/contato-clinic.model';
import { Principal } from 'app/core';
import { ContatoClinicService } from './contato-clinic.service';

@Component({
    selector: 'jhi-contato-clinic',
    templateUrl: './contato-clinic.component.html'
})
export class ContatoClinicComponent implements OnInit, OnDestroy {
    contatoes: IContatoClinic[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private contatoService: ContatoClinicService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.contatoService.query().subscribe(
            (res: HttpResponse<IContatoClinic[]>) => {
                this.contatoes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInContatoes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IContatoClinic) {
        return item.id;
    }

    registerChangeInContatoes() {
        this.eventSubscriber = this.eventManager.subscribe('contatoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
