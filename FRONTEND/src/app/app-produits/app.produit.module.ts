
import { NgModule } from '@angular/core'
import { ContenuProduitComponent } from './contenu/contenu.component'
import { AppListeComponent } from '../app-component-liste/app-liste.component'

@NgModule({
    imports: [
        ContenuProduitComponent,
        AppListeComponent
    ],
    exports: [] // Optionnel : si vous voulez exporter ces composants

})
export class PageProduitModule  {}