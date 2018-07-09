import { IConsultaClinic } from 'app/shared/model//consulta-clinic.model';
import { IContatoClinic } from 'app/shared/model//contato-clinic.model';

export const enum Especialidade {
    CARDIO = 'CARDIO',
    ENDOCRINOLOGIA = 'ENDOCRINOLOGIA',
    ORTOPEDIA = 'ORTOPEDIA',
    PEDIATRIA = 'PEDIATRIA'
}

export interface IMedicoClinic {
    id?: number;
    nome?: string;
    crm?: number;
    especialidades?: Especialidade;
    medicos?: IConsultaClinic[];
    contato?: IContatoClinic;
}

export class MedicoClinic implements IMedicoClinic {
    constructor(
        public id?: number,
        public nome?: string,
        public crm?: number,
        public especialidades?: Especialidade,
        public medicos?: IConsultaClinic[],
        public contato?: IContatoClinic
    ) {}
}
