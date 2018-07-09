export interface IContatoClinic {
    id?: number;
    name?: string;
    value?: string;
    observation?: string;
}

export class ContatoClinic implements IContatoClinic {
    constructor(public id?: number, public name?: string, public value?: string, public observation?: string) {}
}
