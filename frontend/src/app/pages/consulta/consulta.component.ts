import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './consulta.component.html'
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
