import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IConsultaClinic } from 'app/shared/model/consulta-clinic.model';
import { ConsultaClinicService } from './consulta-clinic.service';

@Component({
    selector: 'jhi-consulta-clinic-delete-dialog',
    templateUrl: './consulta-clinic-delete-dialog.component.html'
})
export class ConsultaClinicDeleteDialogComponent {
    consulta: IConsultaClinic;

    constructor(
        private consultaService: ConsultaClinicService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.consultaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'consultaListModification',
                content: 'Deleted an consulta'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-consulta-clinic-delete-popup',
    template: ''
})
export class ConsultaClinicDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ consulta }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ConsultaClinicDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.consulta = consulta;
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
