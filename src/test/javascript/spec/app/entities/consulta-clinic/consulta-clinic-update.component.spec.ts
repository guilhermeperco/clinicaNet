/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ClinicaNetTestModule } from '../../../test.module';
import { ConsultaClinicUpdateComponent } from 'app/entities/consulta-clinic/consulta-clinic-update.component';
import { ConsultaClinicService } from 'app/entities/consulta-clinic/consulta-clinic.service';
import { ConsultaClinic } from 'app/shared/model/consulta-clinic.model';

describe('Component Tests', () => {
    describe('ConsultaClinic Management Update Component', () => {
        let comp: ConsultaClinicUpdateComponent;
        let fixture: ComponentFixture<ConsultaClinicUpdateComponent>;
        let service: ConsultaClinicService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ClinicaNetTestModule],
                declarations: [ConsultaClinicUpdateComponent]
            })
                .overrideTemplate(ConsultaClinicUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ConsultaClinicUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConsultaClinicService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ConsultaClinic(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.consulta = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ConsultaClinic();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.consulta = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
