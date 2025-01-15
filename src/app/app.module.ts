import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';
import { ListaComponent } from './lista/lista.component';
import { MedicosComponent } from './medicos/medicos.component';
import { PacientesComponent } from './pacientes/pacientes.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        MedicosComponent,
        PacientesComponent,
        ListaComponent,
        CadastroComponent,
        CommonModule
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
    ],
    providers: [provideHttpClient()],
    bootstrap: [AppComponent]
})
export class AppModule { }
