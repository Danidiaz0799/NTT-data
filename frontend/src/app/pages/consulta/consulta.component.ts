import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container d-flex justify-content-center align-items-center" style="min-height:60vh;">
      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="bg-white p-4 rounded shadow w-100" style="max-width:480px;">
        <h2 class="h5 fw-bold mb-4 text-center">Consulta de Cliente</h2>
        <div class="mb-3">
          <label class="form-label">Tipo de Documento</label>
          <select formControlName="tipoDocumento" class="form-select">
            <option value="">Seleccione...</option>
            <option value="C">Cédula</option>
            <option value="P">Pasaporte</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label">Número de Documento</label>
          <input type="text" formControlName="numeroDocumento" (input)="onNumeroInput($event)" class="form-control" inputmode="numeric" />
          <div *ngIf="form.get('numeroDocumento')?.invalid && form.get('numeroDocumento')?.touched" class="text-danger small mt-1">
            El número (sin separadores) debe tener entre 8 y 11 dígitos.
          </div>
        </div>
        <button type="submit" [disabled]="form.invalid || loading" class="btn btn-primary w-100">
          Buscar
        </button>
        <div *ngIf="error" class="mt-3 text-danger text-center">Cliente no encontrado.</div>
      </form>
    </div>
  `
})
export class ConsultaComponent {
  form = inject(FormBuilder).group({
    tipoDocumento: ['', Validators.required],
    numeroDocumento: ['', [Validators.required, this.digitosValidator(8, 11)]]
  });
  router = inject(Router);
  clienteService = inject(ClienteService);
  loading = false;
  error = false;

  onNumeroInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const digits = (input.value || '').replace(/\D/g, '').slice(0, 11);
    // Formatear con separadores de miles
    const withSep = digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    this.form.get('numeroDocumento')!.setValue(withSep, { emitEvent: false });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = false;
    const { tipoDocumento, numeroDocumento } = this.form.value;
    const numeroSinSep = (numeroDocumento || '').replace(/\D/g, '');
    this.clienteService.consultarCliente(tipoDocumento!, numeroSinSep).subscribe({
      next: (cliente) => {
        this.clienteService.setClienteResultado(cliente);
        this.router.navigate(['/resumen', tipoDocumento, numeroSinSep]);
        this.loading = false;
      },
      error: (err) => {
        this.error = err.status === 404;
        this.loading = false;
      }
    });
  }

  private digitosValidator(min: number, max: number) {
    return (control: any) => {
      const digits = (control.value || '').replace(/\D/g, '');
      if (!digits) return { required: true };
      return digits.length >= min && digits.length <= max ? null : { range: true };
    };
  }
}
