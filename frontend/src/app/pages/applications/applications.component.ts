import { Component } from '@angular/core';
import { ApplicationColumnComponent } from 'app/components/column/application-column.component';
import { Candidature } from 'app/models/candidature.model';

@Component({
  selector: 'app-applications',
  imports: [ApplicationColumnComponent],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css'
})
export class ApplicationsComponent {
  candidaturesNoResponse: Candidature[] = [
    {
      id: 1,
      entreprise: 'OpenAI',
      poste: 'Développeur Backend',
      date_candidature: new Date('2025-05-01'),
      statut: 'Pas de réponse',
      commentaire: 'Envoyé par LinkedIn'
    }
  ];

  candidaturesInProgress: Candidature[] = [
    {
      id: 2,
      entreprise: 'Google',
      poste: 'SWE',
      date_candidature: new Date('2025-05-03'),
      statut: 'En cours',
      commentaire: 'Test technique passé'
    }
  ];

  candidaturesRejected: Candidature[] = [
    {
      id: 3,
      entreprise: 'Amazon',
      poste: 'DevOps',
      date_candidature: new Date('2025-04-28'),
      statut: 'Refusé',
      commentaire: 'Mail de refus reçu'
    }
  ];

  candidaturesAccepted: Candidature[] = [
    {
      id: 4,
      entreprise: 'Microsoft',
      poste: 'Ingénieur Logiciel',
      date_candidature: new Date('2025-05-02'),
      statut: 'Accepté',
      commentaire: 'Contrat signé'
    }
  ];
}
