import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
  imports: [CommonModule]
})
export class ListaComponent implements OnInit {
  jsonData: any = {};  // Dados dos médicos ou pacientes
  origem: string = '';  // Para armazenar o valor de origem (paciente ou medico)
  showConfirmModal: boolean = false;
  showNotification: boolean = false;
  itemIdToDelete: number | null = null;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.origem = params['origem'];  // Captura o valor de origem (medico ou paciente)
      if (this.origem) {
        this.fetchData(this.origem);  // Chama a função para buscar os dados sem paginação
      }
    });
  }

  fetchData(origem: string): void {
    console.log('Buscando dados para:', origem);  // Apenas para debug
    const url = `http://localhost:8080/${origem}/buscar`;  // Remover o parâmetro de página
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('Dados recebidos:', data);  // Verifica os dados recebidos
        this.jsonData = data;
      })
      .catch(error => console.error('Erro ao buscar dados:', error));
  }

  updateItem(id: number): void {
    // Redireciona para a tela de atualização com o ID
    this.router.navigate([`/atualizar/${id}`]);
  }

  confirmDelete(id: number): void {
    // Exibe o modal de confirmação de exclusão
    this.itemIdToDelete = id;
    this.showConfirmModal = true;
  }

  closeModal(): void {
    this.showConfirmModal = false;
  }

  deleteItem(): void {
    // Faz a requisição para deletar o item
    if (this.itemIdToDelete) {
      const url = `http://localhost:8080/${this.origem}/Delete/${this.itemIdToDelete}`;
      fetch(url, { method: 'DELETE' })
        .then(response => {
          if (response.ok) {
            this.showNotification = true;
            setTimeout(() => {
              this.showNotification = false;
              this.fetchData(this.origem);  // Recarrega os dados após a exclusão
            }, 3000); // Notificação visível por 3 segundos
            this.closeModal();
          } else {
            console.error('Erro ao excluir:', response.statusText);
          }
        })
        .catch(error => console.error('Erro ao excluir:', error));
    }
  }

  goBack(): void {
    window.history.back();
  }
}
