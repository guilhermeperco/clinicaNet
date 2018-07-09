import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMedicoClinic } from 'app/shared/model/medico-clinic.model';
import { MedicoClinicService } from './medico-clinic.service';

@Component({
    selector: 'jhi-medico-clinic-delete-dialog',
    templateUrl: './medico-clinic-delete-dialog.component.html'
})
export class MedicoClinicDeleteDialogComponent {
    medico: IMedicoClinic;

    constructor(private medicoService: MedicoClinicService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.medicoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'medicoListModification',
                content: 'Deleted an medico'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-medico-clinic-delete-popup',
    template: ''
})
export class MedicoClinicDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ medico }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MedicoClinicDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.medico = medico;
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
