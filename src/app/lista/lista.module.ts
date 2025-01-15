import { CommonModule, NgFor, NgIf } from '@angular/common'; // Importando CommonModule
import { NgModule } from '@angular/core';
import { ListaComponent } from './lista.component';

@NgModule({
    declarations: [ListaComponent],
    imports: [
        CommonModule,
        NgFor,
        NgIf,
    ]
})
export class ListaModule { }
