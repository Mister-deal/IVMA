import { Routes } from '@angular/router';
import { ContenuComponent } from './app-accueil/contenu/contenu.component';
import { AppFormConnexionComponent } from './app-form-connexion/app-form-connexion.component';
import { AppFormInscriptionComponent } from './app-form-inscription/app-form-inscription.component';
import { PageInventaireComponent } from './app-inventaire/app.inventaire';
import { PageProduitComponent } from './app-produits/app.produit';
import { PageReapprovisionnementComponent } from './app-reapprovisionnement/app.reapprovisionnement';
import { PageUtilisateurComponent } from './app-utilisateur/app.utilisateur';

export const routes: Routes = [
  { path: '', redirectTo: 'connexion', pathMatch: 'full' },
  { path: 'connexion', component: AppFormConnexionComponent },
  { path: 'inscription', component: AppFormInscriptionComponent },
  { path: 'accueil', component: ContenuComponent },
  { path: 'inventaire', component: PageInventaireComponent },
  { path: 'produit', component: PageProduitComponent},
  { path: 'reapprovisionnement', component: PageReapprovisionnementComponent},
  { path: 'utilisateur', component: PageUtilisateurComponent }
];