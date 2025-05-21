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
  @Output() candidatureMove = new EventEmitter<{ candidature: Candidature, ancienStatut: string, nouveauStatut: string }>();
  @Output() addCandidatureClick = new EventEmitter<string>();

  onDrop(event: CdkDragDrop<Candidature[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const candidature = event.previousContainer.data[event.previousIndex];
      const ancienStatut = candidature.statut;
      const nouveauStatut = this.title;
      this.candidatureMove.emit({ candidature, ancienStatut, nouveauStatut });
    }
  }

  addCandidature() {
    this.addCandidatureClick.emit(this.title);
  }
}
