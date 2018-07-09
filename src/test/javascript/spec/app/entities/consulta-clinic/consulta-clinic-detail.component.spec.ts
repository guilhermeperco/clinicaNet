/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ClinicaNetTestModule } from '../../../test.module';
import { ConsultaClinicDetailComponent } from 'app/entities/consulta-clinic/consulta-clinic-detail.component';
import { ConsultaClinic } from 'app/shared/model/consulta-clinic.model';

describe('Component Tests', () => {
    describe('ConsultaClinic Management Detail Component', () => {
        let comp: ConsultaClinicDetailComponent;
        let fixture: ComponentFixture<ConsultaClinicDetailComponent>;
        const route = ({ data: of({ consulta: new ConsultaClinic(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ClinicaNetTestModule],
                declarations: [ConsultaClinicDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ConsultaClinicDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ConsultaClinicDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.consulta).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
