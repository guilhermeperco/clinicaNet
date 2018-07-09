/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ClinicaNetTestModule } from '../../../test.module';
import { ConsultaClinicDeleteDialogComponent } from 'app/entities/consulta-clinic/consulta-clinic-delete-dialog.component';
import { ConsultaClinicService } from 'app/entities/consulta-clinic/consulta-clinic.service';

describe('Component Tests', () => {
    describe('ConsultaClinic Management Delete Component', () => {
        let comp: ConsultaClinicDeleteDialogComponent;
        let fixture: ComponentFixture<ConsultaClinicDeleteDialogComponent>;
        let service: ConsultaClinicService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ClinicaNetTestModule],
                declarations: [ConsultaClinicDeleteDialogComponent]
            })
                .overrideTemplate(ConsultaClinicDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ConsultaClinicDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConsultaClinicService);
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
