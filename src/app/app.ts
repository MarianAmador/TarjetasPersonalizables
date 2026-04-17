import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TarjetaComponent } from './tarjeta/tarjeta';

interface Gato {
  id: number;
  nombre: string;
  edad: number;
  descripcion: string;
  emoji: string;
  badge: string;
  likes: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, TarjetaComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {

  gatos: Gato[] = [];
  mostrarFormulario: boolean = false;

  nuevoGato = {
    nombre: '',
    edad: 1,
    descripcion: '',
    emoji: '😺',
    badge: ''
  };

  emojisDisponibles: string[] = [
    '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾', '🐱', '🐈', '🐾', '💙', '💚'
  ];

  ngOnInit(): void {
    const guardados = localStorage.getItem('gatos');
    if (guardados) {
      this.gatos = JSON.parse(guardados);
    }
  }

  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  agregarGato(): void {
    if (!this.nuevoGato.nombre.trim()) return;

    const gato: Gato = {
      id: Date.now(),
      ...this.nuevoGato,
      likes: 0
    };

    this.gatos.push(gato);
    this.guardarEnStorage();
    this.resetFormulario();
    this.mostrarFormulario = false;
  }

  darLike(id: number): void {
    const gato = this.gatos.find(g => g.id === id);
    if (gato) {
      gato.likes++;
      this.guardarEnStorage();
    }
  }

  eliminarGato(id: number): void {
    this.gatos = this.gatos.filter(g => g.id !== id);
    this.guardarEnStorage();
  }

  private guardarEnStorage(): void {
    localStorage.setItem('gatos', JSON.stringify(this.gatos));
  }

  private resetFormulario(): void {
    this.nuevoGato = { nombre: '', edad: 1, descripcion: '', emoji: '😺', badge: '' };
  }
}