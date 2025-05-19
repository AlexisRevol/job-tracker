import { Component, Input } from '@angular/core';
import { Candidature } from 'app/models/candidature.model';
import { CandidatureCardComponent } from '../card/candidature-card.component';
import { NgFor } from '@angular/common';
import { DragDropModule, CdkDragDrop  } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-application-column',
  standalone: true,
  imports: [NgFor, CandidatureCardComponent, DragDropModule],
  templateUrl: './application-column.component.html',
  styleUrls: ['./application-column.component.css']
})
export class ApplicationColumnComponent {
  @Input() title!: string;
  @Input() candidatures: Candidature[] = [];

  @Input() dropFn!: (event: CdkDragDrop<Candidature[]>) => void;

  drop(event: CdkDragDrop<Candidature[]>) {
    if (this.dropFn) {
      this.dropFn(event);  // délégué au parent
    }
  }
}
