/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ClinicaNetTestModule } from '../../../test.module';
import { PacienteClinicUpdateComponent } from 'app/entities/paciente-clinic/paciente-clinic-update.component';
import { PacienteClinicService } from 'app/entities/paciente-clinic/paciente-clinic.service';
import { PacienteClinic } from 'app/shared/model/paciente-clinic.model';

describe('Component Tests', () => {
    describe('PacienteClinic Management Update Component', () => {
        let comp: PacienteClinicUpdateComponent;
        let fixture: ComponentFixture<PacienteClinicUpdateComponent>;
        let service: PacienteClinicService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ClinicaNetTestModule],
                declarations: [PacienteClinicUpdateComponent]
            })
                .overrideTemplate(PacienteClinicUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PacienteClinicUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PacienteClinicService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PacienteClinic(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.paciente = entity;
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
                    const entity = new PacienteClinic();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.paciente = entity;
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
