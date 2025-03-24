import { Routes } from '@angular/router';
import { AppFormConnexionComponent } from './app-form-connexion/app-form-connexion.component';
import { AppFormInscriptionComponent } from './app-form-inscription/app-form-inscription.component';

export const routes: Routes = [
  { path: '', redirectTo: 'connexion', pathMatch: 'full' },
  { path: 'connexion', component: AppFormConnexionComponent },
  // Ajoutez cette route quand le composant d'inscription sera créé
  { path: 'inscription', component: AppFormInscriptionComponent },
];