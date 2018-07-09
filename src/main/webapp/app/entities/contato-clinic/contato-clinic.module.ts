import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClinicaNetSharedModule } from 'app/shared';
import {
    ContatoClinicComponent,
    ContatoClinicDetailComponent,
    ContatoClinicUpdateComponent,
    ContatoClinicDeletePopupComponent,
    ContatoClinicDeleteDialogComponent,
    contatoRoute,
    contatoPopupRoute
} from './';

const ENTITY_STATES = [...contatoRoute, ...contatoPopupRoute];

@NgModule({
    imports: [ClinicaNetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ContatoClinicComponent,
        ContatoClinicDetailComponent,
        ContatoClinicUpdateComponent,
        ContatoClinicDeleteDialogComponent,
        ContatoClinicDeletePopupComponent
    ],
    entryComponents: [
        ContatoClinicComponent,
        ContatoClinicUpdateComponent,
        ContatoClinicDeleteDialogComponent,
        ContatoClinicDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClinicaNetContatoClinicModule {}
