import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IContatoClinic } from 'app/shared/model/contato-clinic.model';
import { ContatoClinicService } from './contato-clinic.service';

@Component({
    selector: 'jhi-contato-clinic-delete-dialog',
    templateUrl: './contato-clinic-delete-dialog.component.html'
})
export class ContatoClinicDeleteDialogComponent {
    contato: IContatoClinic;

    constructor(private contatoService: ContatoClinicService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.contatoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'contatoListModification',
                content: 'Deleted an contato'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-contato-clinic-delete-popup',
    template: ''
})
export class ContatoClinicDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ contato }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ContatoClinicDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.contato = contato;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
