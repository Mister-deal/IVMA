
import { NgModule } from '@angular/core'
import { ContenuReapprovisionnementComponent } from './contenu/contenu.component'
import { AppListeComponent } from '../app-component-liste/app-liste.component'

@NgModule({
    imports: [
        ContenuReapprovisionnementComponent,
        AppListeComponent
    ],
    exports: [] // Optionnel : si vous voulez exporter ces composants

})
export class PageReapprovisionnementModule  {}