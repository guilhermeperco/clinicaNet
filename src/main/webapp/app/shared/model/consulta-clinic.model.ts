import { Moment } from 'moment';
import { IPacienteClinic } from 'app/shared/model//paciente-clinic.model';
import { IMedicoClinic } from 'app/shared/model//medico-clinic.model';

export interface IConsultaClinic {
    id?: number;
    dataHora?: Moment;
    anotacoesDoMedico?: string;
    paciente?: IPacienteClinic;
    medico?: IMedicoClinic;
}

export class ConsultaClinic implements IConsultaClinic {
    constructor(
        public id?: number,
        public dataHora?: Moment,
        public anotacoesDoMedico?: string,
        public paciente?: IPacienteClinic,
        public medico?: IMedicoClinic
    ) {}
}
