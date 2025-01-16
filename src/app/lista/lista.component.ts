import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environments';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
  imports: [CommonModule]
})
export class ListaComponent implements OnInit {
  jsonData: any = {};
  origem: string = '';
  showConfirmModal: boolean = false;
  showNotification: boolean = false;
  itemIdToDelete: number | null = null;

  private BaseUrl: string = environment.apiUrl;
  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.origem = params['origem'];
      if (this.origem) {
        this.fetchData(this.origem);
      }
    });
  }

  fetchData(origem: string): void {
    const url = `${this.BaseUrl}/${origem}/buscar`;
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.jsonData = data;
      })
      .catch(error => console.error('Erro ao buscar dados:', error));
  }

  updateItem(id: number): void {
    this.router.navigate([`/atualizar/${id}`]);
  }

  confirmDelete(id: number): void {
    this.itemIdToDelete = id;
    this.showConfirmModal = true;
  }

  closeModal(): void {
    this.showConfirmModal = false;
  }

  deleteItem(): void {
    if (this.itemIdToDelete) {
      const url = `${this.BaseUrl}/${this.origem}/Delete/${this.itemIdToDelete}`;
      fetch(url, { method: 'DELETE' })
        .then(response => {
          if (response.ok) {
            this.showNotification = true;
            setTimeout(() => {
              this.showNotification = false;
              this.fetchData(this.origem);
            }, 3000);
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
