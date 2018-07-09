/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ClinicaNetTestModule } from '../../../test.module';
import { ContatoClinicDetailComponent } from 'app/entities/contato-clinic/contato-clinic-detail.component';
import { ContatoClinic } from 'app/shared/model/contato-clinic.model';

describe('Component Tests', () => {
    describe('ContatoClinic Management Detail Component', () => {
        let comp: ContatoClinicDetailComponent;
        let fixture: ComponentFixture<ContatoClinicDetailComponent>;
        const route = ({ data: of({ contato: new ContatoClinic(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ClinicaNetTestModule],
                declarations: [ContatoClinicDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ContatoClinicDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ContatoClinicDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.contato).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
