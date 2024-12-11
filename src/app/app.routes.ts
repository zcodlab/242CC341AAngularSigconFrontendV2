import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { RegistrarPersonaComponent } from './component/registrar-persona/registrar-persona.component';
import { SolicitarCotizacionComponent } from './component/solicitar-cotizacion/solicitar-cotizacion.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'registrar-persona', component: RegistrarPersonaComponent },
  { path: 'solicitar-cotizacion', component: SolicitarCotizacionComponent },
];
