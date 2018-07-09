import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContatoClinic } from 'app/shared/model/contato-clinic.model';
import { ContatoClinicService } from './contato-clinic.service';
import { ContatoClinicComponent } from './contato-clinic.component';
import { ContatoClinicDetailComponent } from './contato-clinic-detail.component';
import { ContatoClinicUpdateComponent } from './contato-clinic-update.component';
import { ContatoClinicDeletePopupComponent } from './contato-clinic-delete-dialog.component';
import { IContatoClinic } from 'app/shared/model/contato-clinic.model';

@Injectable({ providedIn: 'root' })
export class ContatoClinicResolve implements Resolve<IContatoClinic> {
    constructor(private service: ContatoClinicService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((contato: HttpResponse<ContatoClinic>) => contato.body));
        }
        return of(new ContatoClinic());
    }
}

export const contatoRoute: Routes = [
    {
        path: 'contato-clinic',
        component: ContatoClinicComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicaNetApp.contato.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'contato-clinic/:id/view',
        component: ContatoClinicDetailComponent,
        resolve: {
            contato: ContatoClinicResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicaNetApp.contato.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'contato-clinic/new',
        component: ContatoClinicUpdateComponent,
        resolve: {
            contato: ContatoClinicResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicaNetApp.contato.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'contato-clinic/:id/edit',
        component: ContatoClinicUpdateComponent,
        resolve: {
            contato: ContatoClinicResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicaNetApp.contato.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const contatoPopupRoute: Routes = [
    {
        path: 'contato-clinic/:id/delete',
        component: ContatoClinicDeletePopupComponent,
        resolve: {
            contato: ContatoClinicResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicaNetApp.contato.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
