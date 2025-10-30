import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="d-flex flex-column min-vh-100 bg-light">
      <header class="bg-primary text-white py-3 shadow-sm">
        <h1 class="h4 fw-bold text-center m-0">Consulta de Clientes</h1>
      </header>
      <main class="flex-fill d-flex align-items-center justify-content-center p-3">
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class AppComponent {}
