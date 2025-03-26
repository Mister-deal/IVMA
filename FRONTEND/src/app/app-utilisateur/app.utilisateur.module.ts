
import { NgModule } from '@angular/core'
import { ContenuUtilisateurComponent } from './contenu/contenu.component'
import { AppListeComponent } from '../app-component-liste/app-liste.component'

@NgModule({
    imports: [
        ContenuUtilisateurComponent,
        AppListeComponent
    ],
    exports: [] // Optionnel : si vous voulez exporter ces composants

})
export class PageUtilisateurModule  {}