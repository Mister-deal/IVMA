import { Component } from '@angular/core';
import { ContenuReapprovisionnementComponent } from './contenu/contenu.component';
import { AppListeComponent } from '../app-component-liste/app-liste.component';
import { AppHeaderComponent } from '../app-component-header/app-header.component';

@Component({
    selector: 'app-page-utilisateur',
    standalone: true,  // Déclarer ce composant comme standalone
    imports: [         // Importer explicitement les composants enfants
      ContenuReapprovisionnementComponent,
      AppListeComponent,
      AppHeaderComponent
    ],
    template: `
    <div class="conteneur">
      <app-header></app-header>
      <app-liste></app-liste>
      <app-contenu></app-contenu>
    </div>
    `,
    styleUrls: ['./app.reapprovisionnement.css']
  })
  export class PageReapprovisionnementComponent {}