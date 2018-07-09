import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMedicoClinic } from 'app/shared/model/medico-clinic.model';

type EntityResponseType = HttpResponse<IMedicoClinic>;
type EntityArrayResponseType = HttpResponse<IMedicoClinic[]>;

@Injectable({ providedIn: 'root' })
export class MedicoClinicService {
    private resourceUrl = SERVER_API_URL + 'api/medicos';

    constructor(private http: HttpClient) {}

    create(medico: IMedicoClinic): Observable<EntityResponseType> {
        return this.http.post<IMedicoClinic>(this.resourceUrl, medico, { observe: 'response' });
    }

    update(medico: IMedicoClinic): Observable<EntityResponseType> {
        return this.http.put<IMedicoClinic>(this.resourceUrl, medico, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMedicoClinic>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMedicoClinic[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
