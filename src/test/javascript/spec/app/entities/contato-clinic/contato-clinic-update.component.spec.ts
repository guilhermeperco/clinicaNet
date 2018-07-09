/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ClinicaNetTestModule } from '../../../test.module';
import { ContatoClinicUpdateComponent } from 'app/entities/contato-clinic/contato-clinic-update.component';
import { ContatoClinicService } from 'app/entities/contato-clinic/contato-clinic.service';
import { ContatoClinic } from 'app/shared/model/contato-clinic.model';

describe('Component Tests', () => {
    describe('ContatoClinic Management Update Component', () => {
        let comp: ContatoClinicUpdateComponent;
        let fixture: ComponentFixture<ContatoClinicUpdateComponent>;
        let service: ContatoClinicService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ClinicaNetTestModule],
                declarations: [ContatoClinicUpdateComponent]
            })
                .overrideTemplate(ContatoClinicUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ContatoClinicUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContatoClinicService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ContatoClinic(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.contato = entity;
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
                    const entity = new ContatoClinic();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.contato = entity;
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
