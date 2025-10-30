import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'consulta',
    loadComponent: () => import('./pages/consulta/consulta.component').then(m => m.ConsultaComponent)
  },
  {
    path: 'resumen/:tipoDoc/:numDoc',
    loadComponent: () => import('./pages/resumen/resumen.component').then(m => m.ResumenComponent)
  },
  { path: '', redirectTo: 'consulta', pathMatch: 'full' },
  { path: '**', redirectTo: 'consulta' }
];
