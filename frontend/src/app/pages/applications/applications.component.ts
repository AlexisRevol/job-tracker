import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationColumnComponent } from 'app/components/column/application-column.component';
import { AddCandidatureModalComponent } from 'app/components/add-candidature-modal/add-candidature-modal.component';
import { PlannerHeaderComponent } from 'app/components/planner-header/planner-header.component';
import { SplineAreaChartComponent } from 'app/components/spline-area-chart/spline-area-chart.component';
import { Candidature } from 'app/models/candidature.model';
import { Colonne } from 'app/models/column.model';
import { CandidatureService } from 'app/services/CandidatureService';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-applications',
  imports: [
    ApplicationColumnComponent,
    CommonModule,
    AddCandidatureModalComponent,
    PlannerHeaderComponent,
    DragDropModule,
    SplineAreaChartComponent,
  ],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css',
})
export class ApplicationsComponent implements OnInit, OnDestroy {
  colonnes: Colonne[] = [];
  modalState = {
    isOpen: false,
    title: '',
  };

  private destroy$ = new Subject<void>();

  constructor(private candidatureService: CandidatureService) {}

  ngOnInit() {
    this.candidatureService.colonnes$
      .pipe(takeUntil(this.destroy$))
      .subscribe((cols) => {
        this.colonnes = cols;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openModalForColumn(titreColonne: string) {
    this.modalState.title = titreColonne;
    this.modalState.isOpen = true;
  }

  closeModal() {
    this.modalState.isOpen = false;
    this.modalState.title = '';
  }

  handleNewCandidature(candidature: Candidature) {
    this.candidatureService.addCandidature(candidature);
    this.closeModal();
  }

  onCandidatureMove(event: {
    candidature: Candidature;
    ancienStatut: string;
    nouveauStatut: string;
  }) {
    this.candidatureService.moveCandidature(
      event.candidature,
      event.ancienStatut,
      event.nouveauStatut,
    );
  }
}
