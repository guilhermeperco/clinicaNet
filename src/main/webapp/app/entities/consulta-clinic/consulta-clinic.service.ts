import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IConsultaClinic } from 'app/shared/model/consulta-clinic.model';

type EntityResponseType = HttpResponse<IConsultaClinic>;
type EntityArrayResponseType = HttpResponse<IConsultaClinic[]>;

@Injectable({ providedIn: 'root' })
export class ConsultaClinicService {
    private resourceUrl = SERVER_API_URL + 'api/consultas';

    constructor(private http: HttpClient) {}

    create(consulta: IConsultaClinic): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(consulta);
        return this.http
            .post<IConsultaClinic>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(consulta: IConsultaClinic): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(consulta);
        return this.http
            .put<IConsultaClinic>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IConsultaClinic>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IConsultaClinic[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(consulta: IConsultaClinic): IConsultaClinic {
        const copy: IConsultaClinic = Object.assign({}, consulta, {
            dataHora: consulta.dataHora != null && consulta.dataHora.isValid() ? consulta.dataHora.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dataHora = res.body.dataHora != null ? moment(res.body.dataHora) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((consulta: IConsultaClinic) => {
            consulta.dataHora = consulta.dataHora != null ? moment(consulta.dataHora) : null;
        });
        return res;
    }
}
