import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environments';

@Component({
  selector: 'app-cadastro',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  origem: string = '';
  cadastroForm: FormGroup;
  showNotification: boolean = false;

  private BaseUrl: string= environment.apiUrl;
  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      ativo: [true],
      genero: ['MASCULINO', Validators.required],
      especialidade: ['', Validators.required],
      endereco: this.fb.group({
        logradouro: ['', Validators.required],
        bairro: ['', Validators.required],
        cep: ['', Validators.required],
        cidade: ['', Validators.required],
        uf: ['', Validators.required],
        complemento: [''],
        numero: ['', Validators.required],
      }),
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.origem = params['origem'] || '';
      this.loadFormFields();
    });
  }

  loadFormFields(): void {
    if (this.origem === 'paciente') {
      this.cadastroForm.addControl('cpf', this.fb.control('', Validators.required));
      this.cadastroForm.addControl('data_nascimento', this.fb.control('', Validators.required));
      this.cadastroForm.addControl('data_registro', this.fb.control(new Date().toISOString(), Validators.required));
  
      this.cadastroForm.removeControl('especialidade');
    } else if (this.origem === 'medico') {
      this.cadastroForm.addControl('crm', this.fb.control('', Validators.required));
    }
  }

  onSubmit(): void {
    if (this.cadastroForm.valid) {
      const url = `${this.BaseUrl}/${this.origem}/cadastro`;
      const body = this.prepareRequestBody();
  
  
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erro na resposta do servidor');
          }
          return response.json();
        })
        .then((data) => {
          this.showNotification = true;
          setTimeout(() => {
            this.showNotification = false;
          }, 3000);
        })
        .catch((error) => {
          console.error('Erro ao realizar cadastro:', error);
        });
    } else {
      console.error('Formulário inválido!');
    }
  }

  prepareRequestBody() {
    const formValues = this.cadastroForm.value;
  
  
    if (this.origem === 'paciente') {
      return {
        nome: formValues.nome,
        ativo: formValues.ativo,
        email: formValues.email,
        cpf: formValues.cpf,
        data_nascimento: formValues.data_nascimento,
        telefone: formValues.telefone,
        genero: formValues.genero,
        data_registro: formValues.data_registro,
        endereco: {
          logradouro: formValues.endereco.logradouro,
          bairro: formValues.endereco.bairro,
          cep: formValues.endereco.cep,
          cidade: formValues.endereco.cidade,
          uf: formValues.endereco.uf,
          complemento: formValues.endereco.complemento,
          numero: formValues.endereco.numero,
        },
      };
    } else if (this.origem === 'medico') {
      return {
        nome: formValues.nome,
        email: formValues.email,
        crm: formValues.crm,
        telefone: formValues.telefone,
        ativo: formValues.ativo,
        especialidade: formValues.especialidade,
        endereco: formValues.endereco,
      };
    }
  
    return {};
  }

  goBack(): void {
    this.location.back();
  }
}
