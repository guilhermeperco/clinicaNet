import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MedicoClinic } from 'app/shared/model/medico-clinic.model';
import { MedicoClinicService } from './medico-clinic.service';
import { MedicoClinicComponent } from './medico-clinic.component';
import { MedicoClinicDetailComponent } from './medico-clinic-detail.component';
import { MedicoClinicUpdateComponent } from './medico-clinic-update.component';
import { MedicoClinicDeletePopupComponent } from './medico-clinic-delete-dialog.component';
import { IMedicoClinic } from 'app/shared/model/medico-clinic.model';

@Injectable({ providedIn: 'root' })
export class MedicoClinicResolve implements Resolve<IMedicoClinic> {
    constructor(private service: MedicoClinicService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((medico: HttpResponse<MedicoClinic>) => medico.body));
        }
        return of(new MedicoClinic());
    }
}

export const medicoRoute: Routes = [
    {
        path: 'medico-clinic',
        component: MedicoClinicComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'clinicaNetApp.medico.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'medico-clinic/:id/view',
        component: MedicoClinicDetailComponent,
        resolve: {
            medico: MedicoClinicResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicaNetApp.medico.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'medico-clinic/new',
        component: MedicoClinicUpdateComponent,
        resolve: {
            medico: MedicoClinicResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicaNetApp.medico.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'medico-clinic/:id/edit',
        component: MedicoClinicUpdateComponent,
        resolve: {
            medico: MedicoClinicResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicaNetApp.medico.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const medicoPopupRoute: Routes = [
    {
        path: 'medico-clinic/:id/delete',
        component: MedicoClinicDeletePopupComponent,
        resolve: {
            medico: MedicoClinicResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicaNetApp.medico.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
