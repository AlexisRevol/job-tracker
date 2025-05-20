import { Component, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationColumnComponent } from 'app/components/column/application-column.component';
import { AddCandidatureModalComponent } from 'app/components/add-candidature-modal/add-candidature-modal.component';
import { PlannerHeaderComponent } from 'app/components/planner-header/planner-header.component';
import { SplineAreaChartComponent } from 'app/components/spline-area-chart/spline-area-chart.component';
import { Candidature } from 'app/models/candidature.model';
import { Colonne } from 'app/models/column.model';

import {
  DragDropModule,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDropList
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-applications',
  imports: [ApplicationColumnComponent, CommonModule, AddCandidatureModalComponent, PlannerHeaderComponent, DragDropModule, SplineAreaChartComponent],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css'
})
export class ApplicationsComponent {
  isModalOpen = false;

   colonnes: Colonne[] = [
    {
      titre: 'Pas de réponse',
      candidatures: [
        {
          id: 1,
          entreprise: 'OpenAI',
          poste: 'Développeur Backend',
          date_candidature: new Date('2025-05-01'),
          statut: 'Pas de réponse',
          commentaire: 'Envoyé par LinkedIn'
        }
      ]
    },
    {
      titre: 'En cours',
      candidatures: [
        {
          id: 2,
          entreprise: 'Google',
          poste: 'SWE',
          date_candidature: new Date('2025-05-03'),
          statut: 'En cours',
          commentaire: 'Test technique passé'
        }
      ]
    },
    {
      titre: 'Refusé',
      candidatures: [
        {
          id: 3,
          entreprise: 'Amazon',
          poste: 'DevOps',
          date_candidature: new Date('2025-04-28'),
          statut: 'Refusé',
          commentaire: 'Mail de refus reçu'
        }
      ]
    },
    {
      titre: 'Accepté',
      candidatures: [
        {
          id: 4,
          entreprise: 'Microsoft',
          poste: 'Ingénieur Logiciel',
          date_candidature: new Date('2025-05-02'),
          statut: 'Accepté',
          commentaire: 'Contrat signé'
        }
      ]
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

    const colonneCorrespondante = this.colonnes.find(
      col => col.titre === candidature.statut
    );

    if (colonneCorrespondante) {
      colonneCorrespondante.candidatures.push(candidature);
    } else {
      console.warn(`Statut inconnu : ${candidature.statut}`);
      // Optionnel : créer une nouvelle colonne dynamiquement ?
      // this.colonnes.push({ titre: candidature.statut, candidatures: [candidature] });
    }

    // Appel éventuel à un backend ici
  }


}
