/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ClinicaNetTestModule } from '../../../test.module';
import { PacienteClinicDetailComponent } from 'app/entities/paciente-clinic/paciente-clinic-detail.component';
import { PacienteClinic } from 'app/shared/model/paciente-clinic.model';

describe('Component Tests', () => {
    describe('PacienteClinic Management Detail Component', () => {
        let comp: PacienteClinicDetailComponent;
        let fixture: ComponentFixture<PacienteClinicDetailComponent>;
        const route = ({ data: of({ paciente: new PacienteClinic(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ClinicaNetTestModule],
                declarations: [PacienteClinicDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PacienteClinicDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PacienteClinicDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.paciente).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
