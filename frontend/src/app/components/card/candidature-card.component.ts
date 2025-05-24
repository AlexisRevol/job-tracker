import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Nécessaire pour ngClass, date pipe
import { Candidature } from 'app/models/candidature.model'; // Assurez-vous que le chemin est correct

@Component({
  selector: 'app-candidature-card',
  standalone: true, // Si vous utilisez Angular 15+ en mode standalone
  imports: [CommonModule], // Nécessaire pour ngClass, date pipe
  templateUrl: './candidature-card.component.html',
  styleUrls: ['./candidature-card.component.css'],
})
export class CandidatureCardComponent {
  @Input() candidature!: Candidature;

  getStatusClass(status: string): string {
    const normalizedStatus = status ? status.toLowerCase() : 'no-response';

    switch (normalizedStatus) {
      case 'refusé':
      case 'refuse':
        return 'refused';
      case 'en attente':
      case 'pas de réponse':
        return 'no-response';
      case 'en cours':
        return 'in-progress';
      case 'accepté':
      case 'accepte':
        return 'accepted';
      case 'entretien':
        return 'interview';
      default:
        return 'no-response';
    }
  }
}
