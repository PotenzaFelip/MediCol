import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent {
  origem: string = '';  // Definido como "medico"
  currentPage: number = 0;
  data: any = {};  // Para armazenar os dados recebidos da API
  itemIdToDelete: any = null;  // Armazena o ID do item a ser deletado
  showConfirmModal: boolean = false;  // Controla a exibição do modal de confirmação

  constructor(
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    //private http: HttpClient
  ) {}
  jsonData: string = 'Clique em um dos botões acima para carregar os dados.'; // Armazena o retorno em JSON ou mensagens

  // Função para buscar dados da API
  fetchData(origem: string): void {
    this.origem = origem;
    const url = `http://localhost:8080/${this.origem}/buscar`;

    // Mostra mensagem de carregamento enquanto espera a resposta
    this.jsonData = 'Carregando dados...';

    // Faz a requisição HTTP
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro ao carregar ${origem}s: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        // Exibe os dados formatados como string
        this.jsonData = JSON.stringify(data, null, 2);
      })
      .catch((error) => {
        // Mostra mensagem de erro em caso de falha
        this.jsonData = `Erro: ${error.message}`;
      });
  }
  // ngOnInit(): void {
  //   this.fetchData();  // Carregar dados ao inicializar
  // }

  // // Função para pegar dados da API
  // fetchData(): void {
  //   const url = `http://localhost:8080/${this.origem}/buscar?page=${this.currentPage}`;

  //   fetch(url)
  //     .then(response => response.json())
  //     .then(data => {
  //       this.data = data;
  //     })
  //     .catch(error => console.error(`Erro ao buscar ${this.origem}s:`, error));
  // }

  // // Função para navegar entre as páginas
  // goToPage(page: number): void {
  //   this.currentPage = page;
  //   this.fetchData();
  // }

  // // Função para atualizar um item
  // updateItem(itemId: string): void {
  //   console.log('Atualizando item:', itemId);
  //   // Implementar a lógica para atualizar um item
  // }

  // // Função para mostrar o modal de confirmação de exclusão
  // confirmDelete(itemId: string): void {
  //   this.itemIdToDelete = itemId;
  //   this.showConfirmModal = true;
  // }

  // // Função para fechar o modal
  // closeModal(): void {
  //   this.showConfirmModal = false;
  // }

  // // Função para deletar o item
  // deleteItem(): void {
  //   if (this.itemIdToDelete) {
  //     const url = `http://localhost:8080/${this.origem}/Delete/${this.itemIdToDelete}`;

  //     fetch(url, { method: 'DELETE' })
  //       .then(response => {
  //         if (response.ok) {
  //           alert('Excluído com sucesso!');
  //           this.fetchData();  // Atualiza a lista após exclusão
  //           this.closeModal();
  //         } else {
  //           console.error('Erro ao excluir:', response.statusText);
  //         }
  //       })
  //       .catch(error => console.error('Erro ao excluir:', error));
  //   }
  // }
  goBack(): void {
    this.location.back();
  }
}
