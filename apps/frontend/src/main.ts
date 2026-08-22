import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <main class="shell">
      <span class="eyebrow">Portal Guajiranet</span>
      <h1>Frontend base listo</h1>
      <p>Aplicación Angular modular dentro del monorepo.</p>
      <span class="status">Estado: operativo</span>
    </main>
  `,
  styles: [`
    .shell{max-width:720px;margin:12vh auto;padding:3rem;font-family:system-ui,sans-serif}
    .eyebrow{color:#1257a6;font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-size:.8rem}
    h1{font-size:clamp(2rem,6vw,4rem);margin:.5rem 0;color:#172033}
    p{color:#5d687b;font-size:1.1rem}.status{display:inline-block;padding:.5rem .8rem;border-radius:999px;background:#eaf8ef;color:#19743b;font-weight:600}
  `]
})
class AppComponent {}

bootstrapApplication(AppComponent).catch((error) => console.error(error));
