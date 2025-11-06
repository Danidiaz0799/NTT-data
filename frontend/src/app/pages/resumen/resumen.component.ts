import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-resumen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resumen.component.html'
})
export class ResumenComponent {
  router = inject(Router);
  clienteService = inject(ClienteService);
  cliente = this.clienteService.getClienteResultado();

  volver() {
    this.router.navigate(['/consulta']);
  }
}
