import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClinicaNetSharedModule } from 'app/shared';
import {
    PacienteClinicComponent,
    PacienteClinicDetailComponent,
    PacienteClinicUpdateComponent,
    PacienteClinicDeletePopupComponent,
    PacienteClinicDeleteDialogComponent,
    pacienteRoute,
    pacientePopupRoute
} from './';

const ENTITY_STATES = [...pacienteRoute, ...pacientePopupRoute];

@NgModule({
    imports: [ClinicaNetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PacienteClinicComponent,
        PacienteClinicDetailComponent,
        PacienteClinicUpdateComponent,
        PacienteClinicDeleteDialogComponent,
        PacienteClinicDeletePopupComponent
    ],
    entryComponents: [
        PacienteClinicComponent,
        PacienteClinicUpdateComponent,
        PacienteClinicDeleteDialogComponent,
        PacienteClinicDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClinicaNetPacienteClinicModule {}
