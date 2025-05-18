import { Component } from '@angular/core';
import { ApplicationColumnComponent } from 'app/components/column/application-column.component';
import { AddCandidatureModalComponent } from 'app/components/add-candidature-modal/add-candidature-modal.component';
import { Candidature } from 'app/models/candidature.model';

@Component({
  selector: 'app-applications',
  imports: [ApplicationColumnComponent, AddCandidatureModalComponent],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css'
})
export class ApplicationsComponent {
  isModalOpen = false;

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

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  handleNewCandidature(candidature: Candidature) {
    console.log('Nouvelle candidature :', candidature);
    // logiquement, ici tu pourrais envoyer au backend aussi
    switch (candidature.statut) {
      case 'Pas de réponse':
        this.candidaturesNoResponse.push(candidature);
        break;
      case 'En cours':
        this.candidaturesInProgress.push(candidature);
        break;
      case 'Refusé':
        this.candidaturesRejected.push(candidature);
        break;
      case 'Accepté':
        this.candidaturesAccepted.push(candidature);
        break;
    }
  }
}
