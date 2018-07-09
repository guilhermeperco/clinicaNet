/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ClinicaNetTestModule } from '../../../test.module';
import { MedicoClinicDetailComponent } from 'app/entities/medico-clinic/medico-clinic-detail.component';
import { MedicoClinic } from 'app/shared/model/medico-clinic.model';

describe('Component Tests', () => {
    describe('MedicoClinic Management Detail Component', () => {
        let comp: MedicoClinicDetailComponent;
        let fixture: ComponentFixture<MedicoClinicDetailComponent>;
        const route = ({ data: of({ medico: new MedicoClinic(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ClinicaNetTestModule],
                declarations: [MedicoClinicDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MedicoClinicDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MedicoClinicDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.medico).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
