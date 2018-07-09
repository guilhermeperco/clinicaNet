import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IContatoClinic } from 'app/shared/model/contato-clinic.model';

type EntityResponseType = HttpResponse<IContatoClinic>;
type EntityArrayResponseType = HttpResponse<IContatoClinic[]>;

@Injectable({ providedIn: 'root' })
export class ContatoClinicService {
    private resourceUrl = SERVER_API_URL + 'api/contatoes';

    constructor(private http: HttpClient) {}

    create(contato: IContatoClinic): Observable<EntityResponseType> {
        return this.http.post<IContatoClinic>(this.resourceUrl, contato, { observe: 'response' });
    }

    update(contato: IContatoClinic): Observable<EntityResponseType> {
        return this.http.put<IContatoClinic>(this.resourceUrl, contato, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IContatoClinic>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IContatoClinic[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
