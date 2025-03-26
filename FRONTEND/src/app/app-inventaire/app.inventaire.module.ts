
import { NgModule } from '@angular/core'
import { ContenuInventaireComponent } from './contenu/contenu.component'
import { AppListeComponent } from '../app-component-liste/app-liste.component'
import { AppHeaderComponent } from '../app-component-header/app-header.component'

@NgModule({
    imports: [
        ContenuInventaireComponent,
        AppListeComponent,
        AppHeaderComponent
    ],
    exports: [] // Optionnel : si vous voulez exporter ces composants

})
export class PageInventaireModule  {}