import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';
import { ListaComponent } from './lista/lista.component';
import { MedicosComponent } from './medicos/medicos.component';
import { PacientesComponent } from './pacientes/pacientes.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component:HomeComponent},
    { path: 'medicos', component: MedicosComponent },
    { path: 'pacientes', component: PacientesComponent },
    { path: 'lista', component: ListaComponent },
    { path: 'cadastro', component: CadastroComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
