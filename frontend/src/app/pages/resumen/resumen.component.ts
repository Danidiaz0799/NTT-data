import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-resumen',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container d-flex justify-content-center align-items-center" style="min-height:60vh;">
      <div class="card shadow-lg border-0" style="max-width:600px; width:100%;">
        <div class="card-header bg-primary text-white text-center py-3">
          <h2 class="h4 fw-bold mb-0">Resumen del Cliente</h2>
        </div>
        <div class="card-body p-4">
          <ng-container *ngIf="cliente; else noData">
            <div class="row mb-3">
              <div class="col-md-6">
                <div class="border-start border-primary border-4 ps-3 py-2 mb-3">
                  <small class="text-muted d-block">Primer Nombre</small>
                  <strong class="fs-5">{{cliente.primerNombre}}</strong>
                </div>
              </div>
              <div class="col-md-6">
                <div class="border-start border-primary border-4 ps-3 py-2 mb-3">
                  <small class="text-muted d-block">Segundo Nombre</small>
                  <strong class="fs-5">{{cliente.segundoNombre}}</strong>
                </div>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-6">
                <div class="border-start border-primary border-4 ps-3 py-2 mb-3">
                  <small class="text-muted d-block">Primer Apellido</small>
                  <strong class="fs-5">{{cliente.primerApellido}}</strong>
                </div>
              </div>
              <div class="col-md-6">
                <div class="border-start border-primary border-4 ps-3 py-2 mb-3">
                  <small class="text-muted d-block">Segundo Apellido</small>
                  <strong class="fs-5">{{cliente.segundoApellido}}</strong>
                </div>
              </div>
            </div>
            <hr class="my-3">
            <div class="row">
              <div class="col-12 mb-3">
                <div class="bg-light rounded p-3">
                  <small class="text-muted d-block mb-1"><i class="bi bi-telephone-fill"></i> Teléfono</small>
                  <strong>{{cliente.telefono}}</strong>
                </div>
              </div>
              <div class="col-12 mb-3">
                <div class="bg-light rounded p-3">
                  <small class="text-muted d-block mb-1"><i class="bi bi-house-fill"></i> Dirección</small>
                  <strong>{{cliente.direccion}}</strong>
                </div>
              </div>
              <div class="col-12 mb-3">
                <div class="bg-light rounded p-3">
                  <small class="text-muted d-block mb-1"><i class="bi bi-geo-alt-fill"></i> Ciudad de Residencia</small>
                  <strong>{{cliente.ciudadResidencia}}</strong>
                </div>
              </div>
            </div>
          </ng-container>
          <ng-template #noData>
            <div class="alert alert-danger text-center" role="alert">
              <i class="bi bi-exclamation-triangle-fill me-2"></i>
              No hay datos de cliente consultado.
            </div>
          </ng-template>
        </div>
        <div class="card-footer bg-white border-top-0 p-3">
          <button (click)="volver()" class="btn btn-primary w-100 py-2">
            <i class="bi bi-arrow-left-circle me-2"></i>Volver a Consulta
          </button>
        </div>
      </div>
    </div>
  `
})
export class ResumenComponent {
  router = inject(Router);
  clienteService = inject(ClienteService);
  cliente = this.clienteService.getClienteResultado();

  volver() {
    this.router.navigate(['/consulta']);
  }
}
