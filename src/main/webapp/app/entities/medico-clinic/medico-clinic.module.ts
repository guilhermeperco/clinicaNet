import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClinicaNetSharedModule } from 'app/shared';
import {
    MedicoClinicComponent,
    MedicoClinicDetailComponent,
    MedicoClinicUpdateComponent,
    MedicoClinicDeletePopupComponent,
    MedicoClinicDeleteDialogComponent,
    medicoRoute,
    medicoPopupRoute
} from './';

const ENTITY_STATES = [...medicoRoute, ...medicoPopupRoute];

@NgModule({
    imports: [ClinicaNetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MedicoClinicComponent,
        MedicoClinicDetailComponent,
        MedicoClinicUpdateComponent,
        MedicoClinicDeleteDialogComponent,
        MedicoClinicDeletePopupComponent
    ],
    entryComponents: [
        MedicoClinicComponent,
        MedicoClinicUpdateComponent,
        MedicoClinicDeleteDialogComponent,
        MedicoClinicDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClinicaNetMedicoClinicModule {}
