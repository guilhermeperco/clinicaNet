import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClinicaNetSharedModule } from 'app/shared';
import {
    ConsultaClinicComponent,
    ConsultaClinicDetailComponent,
    ConsultaClinicUpdateComponent,
    ConsultaClinicDeletePopupComponent,
    ConsultaClinicDeleteDialogComponent,
    consultaRoute,
    consultaPopupRoute
} from './';

const ENTITY_STATES = [...consultaRoute, ...consultaPopupRoute];

@NgModule({
    imports: [ClinicaNetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ConsultaClinicComponent,
        ConsultaClinicDetailComponent,
        ConsultaClinicUpdateComponent,
        ConsultaClinicDeleteDialogComponent,
        ConsultaClinicDeletePopupComponent
    ],
    entryComponents: [
        ConsultaClinicComponent,
        ConsultaClinicUpdateComponent,
        ConsultaClinicDeleteDialogComponent,
        ConsultaClinicDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClinicaNetConsultaClinicModule {}
