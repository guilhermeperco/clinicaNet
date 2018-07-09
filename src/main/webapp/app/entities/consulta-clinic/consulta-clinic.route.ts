import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConsultaClinic } from 'app/shared/model/consulta-clinic.model';
import { ConsultaClinicService } from './consulta-clinic.service';
import { ConsultaClinicComponent } from './consulta-clinic.component';
import { ConsultaClinicDetailComponent } from './consulta-clinic-detail.component';
import { ConsultaClinicUpdateComponent } from './consulta-clinic-update.component';
import { ConsultaClinicDeletePopupComponent } from './consulta-clinic-delete-dialog.component';
import { IConsultaClinic } from 'app/shared/model/consulta-clinic.model';

@Injectable({ providedIn: 'root' })
export class ConsultaClinicResolve implements Resolve<IConsultaClinic> {
    constructor(private service: ConsultaClinicService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((consulta: HttpResponse<ConsultaClinic>) => consulta.body));
        }
        return of(new ConsultaClinic());
    }
}

export const consultaRoute: Routes = [
    {
        path: 'consulta-clinic',
        component: ConsultaClinicComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicaNetApp.consulta.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'consulta-clinic/:id/view',
        component: ConsultaClinicDetailComponent,
        resolve: {
            consulta: ConsultaClinicResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicaNetApp.consulta.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'consulta-clinic/new',
        component: ConsultaClinicUpdateComponent,
        resolve: {
            consulta: ConsultaClinicResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicaNetApp.consulta.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'consulta-clinic/:id/edit',
        component: ConsultaClinicUpdateComponent,
        resolve: {
            consulta: ConsultaClinicResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicaNetApp.consulta.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const consultaPopupRoute: Routes = [
    {
        path: 'consulta-clinic/:id/delete',
        component: ConsultaClinicDeletePopupComponent,
        resolve: {
            consulta: ConsultaClinicResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicaNetApp.consulta.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
