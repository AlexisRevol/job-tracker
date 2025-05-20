import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit  } from '@angular/core';
import { Candidature } from 'app/models/candidature.model';
import { CandidatureCardComponent } from '../card/candidature-card.component';
import { NgFor, CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-application-column',
  standalone: true,
  imports: [NgFor, CommonModule, CandidatureCardComponent, DragDropModule],
  templateUrl: './application-column.component.html',
  styleUrls: ['./application-column.component.css']
})
export class ApplicationColumnComponent {
  @Input() title!: string;
  @Input() candidatures: Candidature[] = [];

  onDrop(event: CdkDragDrop<Candidature[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Récupérer la candidature déplacée
      const candidatureDéplacée = event.previousContainer.data[event.previousIndex];
      candidatureDéplacée.statut = this.title;

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
