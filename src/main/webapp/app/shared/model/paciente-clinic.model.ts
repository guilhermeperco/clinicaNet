import { Moment } from 'moment';
import { IConsultaClinic } from 'app/shared/model//consulta-clinic.model';
import { IContatoClinic } from 'app/shared/model//contato-clinic.model';

export const enum EstadoCivil {
    CASADO = 'CASADO',
    SOLTEIRO = 'SOLTEIRO',
    DIVORCIADO = 'DIVORCIADO',
    VIUVO = 'VIUVO'
}

export interface IPacienteClinic {
    id?: number;
    nome?: string;
    cpf?: string;
    dataNascimento?: Moment;
    sexo?: string;
    estadoCivil?: EstadoCivil;
    endereco?: string;
    naturalidade?: string;
    pacientes?: IConsultaClinic[];
    contato?: IContatoClinic;
}

export class PacienteClinic implements IPacienteClinic {
    constructor(
        public id?: number,
        public nome?: string,
        public cpf?: string,
        public dataNascimento?: Moment,
        public sexo?: string,
        public estadoCivil?: EstadoCivil,
        public endereco?: string,
        public naturalidade?: string,
        public pacientes?: IConsultaClinic[],
        public contato?: IContatoClinic
    ) {}
}
