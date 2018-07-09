import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ClinicaNetPacienteClinicModule } from './paciente-clinic/paciente-clinic.module';
import { ClinicaNetMedicoClinicModule } from './medico-clinic/medico-clinic.module';
import { ClinicaNetConsultaClinicModule } from './consulta-clinic/consulta-clinic.module';
import { ClinicaNetContatoClinicModule } from './contato-clinic/contato-clinic.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        ClinicaNetPacienteClinicModule,
        ClinicaNetMedicoClinicModule,
        ClinicaNetConsultaClinicModule,
        ClinicaNetContatoClinicModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClinicaNetEntityModule {}
