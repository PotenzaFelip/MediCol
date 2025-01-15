import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent {
  origem: string = '';
  currentPage: number = 0;
  data: any = {};
  itemIdToDelete: any = null;
  showConfirmModal: boolean = false;

  constructor(
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    //private http: HttpClient
  ) {}
  jsonData: string = 'Clique em um dos botões acima para carregar os dados.';

  fetchData(origem: string): void {
    this.origem = origem;
    const url = `http://localhost:8080/${this.origem}/buscar`;

    this.jsonData = 'Carregando dados...';

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro ao carregar ${origem}s: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        this.jsonData = JSON.stringify(data, null, 2);
      })
      .catch((error) => {
        this.jsonData = `Erro: ${error.message}`;
      });
  }
  // ngOnInit(): void {
  //   this.fetchData();
  // }

  //
  // fetchData(): void {
  //   const url = `http://localhost:8080/${this.origem}/buscar?page=${this.currentPage}`;

  //   fetch(url)
  //     .then(response => response.json())
  //     .then(data => {
  //       this.data = data;
  //     })
  //     .catch(error => console.error(`Erro ao buscar ${this.origem}s:`, error));
  // }

  //
  // goToPage(page: number): void {
  //   this.currentPage = page;
  //   this.fetchData();
  // }

  //
  // updateItem(itemId: string): void {
  //   console.log('Atualizando item:', itemId);
  //
  // }

  //
  // confirmDelete(itemId: string): void {
  //   this.itemIdToDelete = itemId;
  //   this.showConfirmModal = true;
  // }

  //
  // closeModal(): void {
  //   this.showConfirmModal = false;
  // }

  //
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
