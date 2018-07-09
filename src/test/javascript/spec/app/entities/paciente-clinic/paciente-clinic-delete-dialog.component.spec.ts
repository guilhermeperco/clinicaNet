/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ClinicaNetTestModule } from '../../../test.module';
import { PacienteClinicDeleteDialogComponent } from 'app/entities/paciente-clinic/paciente-clinic-delete-dialog.component';
import { PacienteClinicService } from 'app/entities/paciente-clinic/paciente-clinic.service';

describe('Component Tests', () => {
    describe('PacienteClinic Management Delete Component', () => {
        let comp: PacienteClinicDeleteDialogComponent;
        let fixture: ComponentFixture<PacienteClinicDeleteDialogComponent>;
        let service: PacienteClinicService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ClinicaNetTestModule],
                declarations: [PacienteClinicDeleteDialogComponent]
            })
                .overrideTemplate(PacienteClinicDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PacienteClinicDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PacienteClinicService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
