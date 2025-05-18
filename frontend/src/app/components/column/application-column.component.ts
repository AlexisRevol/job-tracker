import { Component, Input } from '@angular/core';
import { Candidature } from 'app/models/candidature.model';
import { CandidatureCardComponent } from '../card/candidature-card.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-application-column',
  standalone: true,
  imports: [NgFor, CandidatureCardComponent],
  templateUrl: './application-column.component.html',
  styleUrls: ['./application-column.component.css']
})
export class ApplicationColumnComponent {
  @Input() title!: string;
  @Input() candidatures: Candidature[] = [];
}
