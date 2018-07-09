/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ClinicaNetTestModule } from '../../../test.module';
import { ContatoClinicDeleteDialogComponent } from 'app/entities/contato-clinic/contato-clinic-delete-dialog.component';
import { ContatoClinicService } from 'app/entities/contato-clinic/contato-clinic.service';

describe('Component Tests', () => {
    describe('ContatoClinic Management Delete Component', () => {
        let comp: ContatoClinicDeleteDialogComponent;
        let fixture: ComponentFixture<ContatoClinicDeleteDialogComponent>;
        let service: ContatoClinicService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ClinicaNetTestModule],
                declarations: [ContatoClinicDeleteDialogComponent]
            })
                .overrideTemplate(ContatoClinicDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ContatoClinicDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContatoClinicService);
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
