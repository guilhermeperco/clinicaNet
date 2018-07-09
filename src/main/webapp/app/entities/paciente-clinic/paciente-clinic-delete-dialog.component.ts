import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPacienteClinic } from 'app/shared/model/paciente-clinic.model';
import { PacienteClinicService } from './paciente-clinic.service';

@Component({
    selector: 'jhi-paciente-clinic-delete-dialog',
    templateUrl: './paciente-clinic-delete-dialog.component.html'
})
export class PacienteClinicDeleteDialogComponent {
    paciente: IPacienteClinic;

    constructor(
        private pacienteService: PacienteClinicService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pacienteService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'pacienteListModification',
                content: 'Deleted an paciente'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-paciente-clinic-delete-popup',
    template: ''
})
export class PacienteClinicDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ paciente }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PacienteClinicDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.paciente = paciente;
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
