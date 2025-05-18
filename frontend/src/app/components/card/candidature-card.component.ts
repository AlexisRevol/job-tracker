import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Candidature } from 'app/models/candidature.model';

@Component({
  selector: 'app-candidature-card',
  imports: [CommonModule],
  templateUrl: './candidature-card.component.html',
  styleUrls: ['./candidature-card.component.css']
})
export class CandidatureCardComponent {
  @Input() candidature!: Candidature;

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'refusé':
        return 'refused';
      case 'en cours':
        return 'in-progress';
      case 'accepté':
        return 'accepted';
      default:
        return 'no-response';
    }
  }
}
