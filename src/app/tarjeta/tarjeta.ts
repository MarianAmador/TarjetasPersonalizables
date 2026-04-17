import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tarjeta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarjeta.html',
  styleUrls: ['./tarjeta.css']
})
export class TarjetaComponent {
  @Input() nombre: string = '';
  @Input() edad: number = 1;
  @Input() descripcion: string = '';
  @Input() emoji: string = '😺';
  @Input() badge: string = '';
  @Input() likes: number = 0;

  @Output() likeClick = new EventEmitter<void>();

  darLike(): void {
    this.likeClick.emit();
  }

  get etiquetaLikes(): string {
    return this.likes === 1 ? 'Like' : 'Likes';
  }
}