import {
	Component,
	ViewChildren,
	QueryList,
	AfterViewInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApplicationColumnComponent } from "app/components/column/application-column.component";
import { AddCandidatureModalComponent } from "app/components/add-candidature-modal/add-candidature-modal.component";
import { PlannerHeaderComponent } from "app/components/planner-header/planner-header.component";
import { SplineAreaChartComponent } from "app/components/spline-area-chart/spline-area-chart.component";
import type { Candidature } from "app/models/candidature.model";
import type { Colonne } from "app/models/column.model";
import type { CandidatureService } from "app/services/CandidatureService";

import {
	DragDropModule,
	CdkDragDrop,
	moveItemInArray,
	transferArrayItem,
	CdkDropList,
} from "@angular/cdk/drag-drop";

@Component({
	selector: "app-applications",
	imports: [
		ApplicationColumnComponent,
		CommonModule,
		AddCandidatureModalComponent,
		PlannerHeaderComponent,
		DragDropModule,
		SplineAreaChartComponent,
	],
	templateUrl: "./applications.component.html",
	styleUrl: "./applications.component.css",
})
export class ApplicationsComponent {
	colonnes: Colonne[] = [];
	isModalOpen = false;
	modalColonneTitle = "";

	constructor(private candidatureService: CandidatureService) {}

	ngOnInit() {
		this.candidatureService.colonnes$.subscribe((cols) => {
			this.colonnes = cols;
		});
	}

	openModalForColumn(titreColonne: string) {
		this.modalColonneTitle = titreColonne;
		this.isModalOpen = true;
	}

	closeModal() {
		this.isModalOpen = false;
		this.modalColonneTitle = "";
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
