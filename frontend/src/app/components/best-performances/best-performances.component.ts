import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NgApexchartsModule,
  ApexChart,
  ApexStroke,
  ApexGrid,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
} from 'ng-apexcharts';
import { Candidature } from 'app/models/candidature.model'; // Ajustez le chemin

export interface PerformanceEntreprise {
  nomEntreprise: string;
  logoUrl?: string;
  totalCandidatures: number;
  evolutionHebdoNombre: number;
  evolutionHebdoPourcentage: number;
  sparklineData: number[];
  sparklineOptions: {
    // Options
    chart: ApexChart;
    stroke: ApexStroke;
    grid: ApexGrid;
    tooltip: ApexTooltip;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    colors: string[];
    fill: ApexFill;
    dataLabels: ApexDataLabels;
    markers: ApexMarkers;
  };
}

@Component({
  selector: 'app-best-performances',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './best-performances.component.html',
  styleUrls: ['./best-performances.component.css'],
  encapsulation: ViewEncapsulation.None, // Pour que les styles ApexCharts s'appliquent correctement
})
export class BestPerformancesComponent implements OnInit, OnChanges {
  @Input() candidatures: Candidature[] = []; // Toutes les candidatures
  @Input() topN: number = 5; // Afficher le top N entreprises

  entreprisesPerformantes: PerformanceEntreprise[] = [];

  ngOnInit() {
    this.processPerformances();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['candidatures']) {
      this.processPerformances();
    }
  }

  processPerformances() {
    if (!this.candidatures || this.candidatures.length === 0) {
      this.entreprisesPerformantes = [];
      return;
    }

    // 1. Agréger les candidatures par entreprise
    const candidaturesParEntreprise = new Map<string, Candidature[]>();
    this.candidatures.forEach((cand) => {
      const list = candidaturesParEntreprise.get(cand.entreprise) || [];
      list.push(cand);
      candidaturesParEntreprise.set(cand.entreprise, list);
    });

    // 2. Calculer les statistiques pour chaque entreprise
    const performances: PerformanceEntreprise[] = [];
    const uneSemaineAvant = new Date();
    uneSemaineAvant.setDate(uneSemaineAvant.getDate() - 7);

    candidaturesParEntreprise.forEach((cands, nomEntreprise) => {
      const totalCandidatures = cands.length;
      const candidaturesCetteSemaine = cands.filter(
        (c) => new Date(c.date_candidature) >= uneSemaineAvant,
      ).length;
      const candidaturesSemainePrecedente = cands.filter((c) => {
        // Approximation
        const dateCand = new Date(c.date_candidature);
        const ilYa14Jours = new Date();
        ilYa14Jours.setDate(ilYa14Jours.getDate() - 14);
        return dateCand >= ilYa14Jours && dateCand < uneSemaineAvant;
      }).length;

      const evolutionHebdoNombre =
        candidaturesCetteSemaine - candidaturesSemainePrecedente; // Simplifié, il faudrait une logique plus fine pour "nouvelles candidatures cette semaine"

      // Pour l'évolution en pourcentage : (actuel - précédent) / précédent * 100
      // Si précédent est 0, le pourcentage n'a pas de sens ou est infini.
      let evolutionHebdoPourcentage = 0;
      const candidaturesAvantCetteSemaine =
        totalCandidatures - candidaturesCetteSemaine;
      if (candidaturesAvantCetteSemaine > 0) {
        // Ici, evolutionHebdoNombre est le nombre de *nouvelles* candidatures cette semaine
        // Pourcentage d'augmentation par rapport au total *avant* cette semaine
        evolutionHebdoPourcentage =
          (candidaturesCetteSemaine / candidaturesAvantCetteSemaine) * 100;
      } else if (candidaturesCetteSemaine > 0) {
        evolutionHebdoPourcentage = 100; // Tout est nouveau
      }

      // Générer des données aléatoires pour le sparkline (à remplacer par vos vraies données d'historique)
      const sparklineData = Array.from({ length: 10 }, () =>
        Math.floor(Math.random() * 15),
      );

      performances.push({
        nomEntreprise,
        totalCandidatures,
        evolutionHebdoNombre: candidaturesCetteSemaine, // On affiche les nouvelles de la semaine
        evolutionHebdoPourcentage,
        sparklineData,
        sparklineOptions: this.getSparklineOptions(
          sparklineData,
          evolutionHebdoNombre >= 0,
        ),
      });
    });

    // 3. Trier par total de candidatures (ou autre critère) et prendre le top N
    this.entreprisesPerformantes = performances
      .sort((a, b) => b.totalCandidatures - a.totalCandidatures)
      .slice(0, this.topN);
  }

  getSparklineOptions(
    data: number[],
    isPositiveEvolution: boolean,
  ): PerformanceEntreprise['sparklineOptions'] {
    const color = isPositiveEvolution ? '#28a745' : '#dc3545'; // Vert pour positif, Rouge pour négatif
    return {
      chart: {
        type: 'line',
        height: 35, // Hauteur très petite pour un sparkline
        sparkline: {
          enabled: true,
        },
        animations: { enabled: false },
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      fill: {
        // Optionnel: ajouter un dégradé sous la ligne
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0.1,
          stops: [0, 100],
        },
      },
      markers: {
        // Optionnel: enlever les marqueurs
        size: 0,
      },
      tooltip: {
        enabled: false, // Désactiver le tooltip standard pour un sparkline
      },
      xaxis: {
        labels: { show: false },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        labels: { show: false },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      grid: { show: false, padding: { top: 2, right: 2, bottom: 2, left: 2 } }, // Pas de grille, padding minimal
      colors: [color],
      dataLabels: { enabled: false }, // Pas de labels sur les données
    };
  }

  // Ajout pour le calcul de l'évolution (plus précis)
  calculateWeeklyEvolution(candidaturesEntreprise: Candidature[]) {
    const now = new Date();
    const startOfThisWeek = new Date(
      now.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1)),
    ); // Lundi de cette semaine
    startOfThisWeek.setHours(0, 0, 0, 0);

    const startOfLastWeek = new Date(startOfThisWeek);
    startOfLastWeek.setDate(startOfThisWeek.getDate() - 7);

    const candidaturesThisWeekCount = candidaturesEntreprise.filter(
      (c) => new Date(c.date_candidature) >= startOfThisWeek,
    ).length;
    const candidaturesLastWeekCount = candidaturesEntreprise.filter((c) => {
      const dateCand = new Date(c.date_candidature);
      return dateCand >= startOfLastWeek && dateCand < startOfThisWeek;
    }).length;

    const diffNombre = candidaturesThisWeekCount - candidaturesLastWeekCount;
    let diffPourcentage = 0;
    if (candidaturesLastWeekCount > 0) {
      diffPourcentage = (diffNombre / candidaturesLastWeekCount) * 100;
    } else if (candidaturesThisWeekCount > 0) {
      diffPourcentage = 100; // Tout est nouveau par rapport à 0 la semaine dernière
    }

    return {
      nombre: diffNombre, // Variation nette
      pourcentage: diffPourcentage,
      nouvellesCetteSemaine: candidaturesThisWeekCount, // Ce qu'on veut afficher
    };
  }

  // Modifier processPerformances pour utiliser la nouvelle logique d'évolution
  // ... dans processPerformances ...
  // candidaturesParEntreprise.forEach((cands, nomEntreprise) => {
  //   const totalCandidatures = cands.length;
  //   const evolution = this.calculateWeeklyEvolution(cands);

  //   // ...
  //   performances.push({
  //     nomEntreprise,
  //     totalCandidatures,
  //     evolutionHebdoNombre: evolution.nouvellesCetteSemaine, // Ou evolution.nombre si vous préférez la variation
  //     evolutionHebdoPourcentage: evolution.pourcentage,
  //   // ...
  //   });
  // });
  // ...
}
