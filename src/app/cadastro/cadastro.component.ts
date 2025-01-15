import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
      genero: ['MASCULINO', Validators.required],  // Valor padrão para 'genero' corretamente configurado
      especialidade: ['', Validators.required],  // Para médicos
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
    console.log('Carregando campos específicos para', this.origem);
    if (this.origem === 'paciente') {
      this.cadastroForm.addControl('cpf', this.fb.control('', Validators.required));
      this.cadastroForm.addControl('data_nascimento', this.fb.control('', Validators.required));
      this.cadastroForm.addControl('data_registro', this.fb.control(new Date().toISOString(), Validators.required));
  
      // Remover o campo especialidade, pois não é necessário para pacientes
      this.cadastroForm.removeControl('especialidade');
    } else if (this.origem === 'medico') {
      this.cadastroForm.addControl('crm', this.fb.control('', Validators.required));
    }
  }

  onSubmit(): void {
    console.log('Formulário enviado!');
    console.log('Formulário válido?', this.cadastroForm.valid);
    console.log('Erros do formulário:', this.cadastroForm.errors);
    
    console.log('Valores do formulário antes de enviar:', this.cadastroForm.value); // Verificar os valores aqui
    
    if (this.cadastroForm.valid) {
      const url = `http://localhost:8080/${this.origem}/cadastro`;
      const body = this.prepareRequestBody();
  
      console.log('URL de envio:', url);
      console.log('Corpo da requisição:', body);
  
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
          console.log('Cadastro realizado com sucesso:', data);
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
  
    // Log de valores do formulário para depuração
    console.log('Valores do formulário:', formValues);
  
    if (this.origem === 'paciente') {
      return {
        nome: formValues.nome,
        ativo: formValues.ativo,
        email: formValues.email,
        cpf: formValues.cpf,
        data_nascimento: formValues.data_nascimento, // Data de nascimento no formato ISO
        telefone: formValues.telefone,
        genero: formValues.genero,
        data_registro: formValues.data_registro, // Data de registro no formato ISO
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
        especialidade: formValues.especialidade,  // Envia apenas para médicos
        endereco: formValues.endereco,
      };
    }
  
    return {};
  }

  goBack(): void {
    this.location.back();
  }
}
