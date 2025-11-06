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
      <div class="card shadow-lg border-0" style="max-width:500px; width:100%;">
        <div class="card-header bg-primary text-white text-center py-3">
          <h2 class="h4 fw-bold mb-0">
            <i class="bi bi-search me-2"></i>Consulta de Cliente
          </h2>
        </div>
        <div class="card-body p-4">
          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <div class="mb-4">
              <label class="form-label fw-semibold">
                <i class="bi bi-card-text me-2"></i>Tipo de Documento
              </label>
              <select formControlName="tipoDocumento" class="form-select form-select-lg">
                <option value="">Seleccione...</option>
                <option value="C">Cédula de Ciudadanía</option>
                <option value="P">Pasaporte</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="form-label fw-semibold">
                <i class="bi bi-123 me-2"></i>Número de Documento
              </label>
              <input 
                type="text" 
                formControlName="numeroDocumento" 
                (input)="onNumeroInput($event)" 
                class="form-control form-control-lg" 
                placeholder="Ingrese el número"
                inputmode="numeric" 
              />
              <div *ngIf="form.get('numeroDocumento')?.invalid && form.get('numeroDocumento')?.touched" 
                   class="text-danger small mt-2">
                <i class="bi bi-exclamation-circle me-1"></i>
                El número debe tener entre 8 y 11 dígitos.
              </div>
            </div>
            <button 
              type="submit" 
              [disabled]="form.invalid || loading" 
              class="btn btn-primary btn-lg w-100 py-3">
              <span *ngIf="!loading">
                <i class="bi bi-search me-2"></i>Buscar Cliente
              </span>
              <span *ngIf="loading">
                <span class="spinner-border spinner-border-sm me-2" role="status"></span>
                Buscando...
              </span>
            </button>
            <div *ngIf="error" class="alert alert-warning mt-3 text-center" role="alert">
              <i class="bi bi-exclamation-triangle me-2"></i>
              Cliente no encontrado. Verifique los datos ingresados.
            </div>
          </form>
        </div>
      </div>
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
