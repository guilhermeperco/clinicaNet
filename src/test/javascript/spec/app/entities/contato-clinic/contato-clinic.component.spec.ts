/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ClinicaNetTestModule } from '../../../test.module';
import { ContatoClinicComponent } from 'app/entities/contato-clinic/contato-clinic.component';
import { ContatoClinicService } from 'app/entities/contato-clinic/contato-clinic.service';
import { ContatoClinic } from 'app/shared/model/contato-clinic.model';

describe('Component Tests', () => {
    describe('ContatoClinic Management Component', () => {
        let comp: ContatoClinicComponent;
        let fixture: ComponentFixture<ContatoClinicComponent>;
        let service: ContatoClinicService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ClinicaNetTestModule],
                declarations: [ContatoClinicComponent],
                providers: []
            })
                .overrideTemplate(ContatoClinicComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ContatoClinicComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContatoClinicService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ContatoClinic(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.contatoes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
