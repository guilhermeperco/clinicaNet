import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PacienteClinic } from 'app/shared/model/paciente-clinic.model';
import { PacienteClinicService } from './paciente-clinic.service';
import { PacienteClinicComponent } from './paciente-clinic.component';
import { PacienteClinicDetailComponent } from './paciente-clinic-detail.component';
import { PacienteClinicUpdateComponent } from './paciente-clinic-update.component';
import { PacienteClinicDeletePopupComponent } from './paciente-clinic-delete-dialog.component';
import { IPacienteClinic } from 'app/shared/model/paciente-clinic.model';

@Injectable({ providedIn: 'root' })
export class PacienteClinicResolve implements Resolve<IPacienteClinic> {
    constructor(private service: PacienteClinicService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((paciente: HttpResponse<PacienteClinic>) => paciente.body));
        }
        return of(new PacienteClinic());
    }
}

export const pacienteRoute: Routes = [
    {
        path: 'paciente-clinic',
        component: PacienteClinicComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicaNetApp.paciente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'paciente-clinic/:id/view',
        component: PacienteClinicDetailComponent,
        resolve: {
            paciente: PacienteClinicResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicaNetApp.paciente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'paciente-clinic/new',
        component: PacienteClinicUpdateComponent,
        resolve: {
            paciente: PacienteClinicResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicaNetApp.paciente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'paciente-clinic/:id/edit',
        component: PacienteClinicUpdateComponent,
        resolve: {
            paciente: PacienteClinicResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicaNetApp.paciente.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pacientePopupRoute: Routes = [
    {
        path: 'paciente-clinic/:id/delete',
        component: PacienteClinicDeletePopupComponent,
        resolve: {
            paciente: PacienteClinicResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicaNetApp.paciente.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
