import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-resumen',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col items-center justify-center min-h-[60vh]">
      <div class="bg-white p-8 rounded shadow w-full max-w-md">
        <h2 class="text-xl font-bold mb-6 text-center">Resumen del Cliente</h2>
        <ng-container *ngIf="cliente; else noData">
          <div class="mb-2"><span class="font-medium">Primer Nombre:</span> {{cliente.primerNombre}}</div>
          <div class="mb-2"><span class="font-medium">Segundo Nombre:</span> {{cliente.segundoNombre}}</div>
          <div class="mb-2"><span class="font-medium">Primer Apellido:</span> {{cliente.primerApellido}}</div>
          <div class="mb-2"><span class="font-medium">Segundo Apellido:</span> {{cliente.segundoApellido}}</div>
          <div class="mb-2"><span class="font-medium">Teléfono:</span> {{cliente.telefono}}</div>
          <div class="mb-2"><span class="font-medium">Dirección:</span> {{cliente.direccion}}</div>
          <div class="mb-2"><span class="font-medium">Ciudad Residencia:</span> {{cliente.ciudadResidencia}}</div>
        </ng-container>
        <ng-template #noData>
          <div class="text-red-500 text-center">No hay datos de cliente consultado.</div>
        </ng-template>
        <button (click)="volver()" class="mt-6 w-full bg-blue-600 text-white py-2 rounded">Volver</button>
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
