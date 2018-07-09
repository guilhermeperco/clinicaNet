/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ClinicaNetTestModule } from '../../../test.module';
import { MedicoClinicUpdateComponent } from 'app/entities/medico-clinic/medico-clinic-update.component';
import { MedicoClinicService } from 'app/entities/medico-clinic/medico-clinic.service';
import { MedicoClinic } from 'app/shared/model/medico-clinic.model';

describe('Component Tests', () => {
    describe('MedicoClinic Management Update Component', () => {
        let comp: MedicoClinicUpdateComponent;
        let fixture: ComponentFixture<MedicoClinicUpdateComponent>;
        let service: MedicoClinicService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ClinicaNetTestModule],
                declarations: [MedicoClinicUpdateComponent]
            })
                .overrideTemplate(MedicoClinicUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MedicoClinicUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MedicoClinicService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MedicoClinic(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.medico = entity;
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
                    const entity = new MedicoClinic();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.medico = entity;
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
