
import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private apiUrl = 'https://localhost:8090/api/cliente';
  private clienteResultado = signal<Cliente | null>(null);

  constructor(private http: HttpClient) {}

  consultarCliente(tipo: string, numero: string): Observable<Cliente> {
    const params = new HttpParams()
      .set('TipoDocumento', tipo)
      .set('NumeroDocumento', numero);
    return this.http.get<Cliente>(this.apiUrl, { params });
  }

  setClienteResultado(cliente: Cliente) {
    this.clienteResultado.set(cliente);
  }

  getClienteResultado(): Cliente | null {
    return this.clienteResultado();
  }
}
