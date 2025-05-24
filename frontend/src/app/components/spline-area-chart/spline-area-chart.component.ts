import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { Colonne } from 'app/models/column.model';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexFill,
  ApexTooltip,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { ChartDataService } from 'app/services/chart-data.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  markers: ApexMarkers;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  tooltip: ApexTooltip;
  colors?: string[];
  legend?: ApexLegend;
};
@Component({
  selector: 'app-spline-area-chart',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './spline-area-chart.component.html',
  styleUrl: './spline-area-chart.component.css',
  // Optionnel: si vous voulez styliser des éléments du chart via CSS externe (ex: tooltip)
  // encapsulation: ViewEncapsulation.None,
})
export class SplineAreaChartComponent implements OnChanges {
  @Input() colonnes: Colonne[] = [];

  // Palette de couleurs moderne et accessible (Exemple, vous pouvez choisir la vôtre)
  // Inspiré par Tailwind CSS colors ou d'autres palettes modernes
  private modernColorMap = new Map<string, string>([
    ['Pas de réponse', '#60A5FA'], // Blue-400
    ['En cours', '#34D399'], // Green-400
    ['Refusé', '#F87171'], // Red-400
    ['Accepté', '#FBBF24'], // Amber-400
    ['Entretien', '#A78BFA'], // Violet-400 (si vous avez ce statut)
  ]);
  // Fallback color
  private defaultChartColor = '#9CA3AF'; // Gray-400

  public chartOptions: ChartOptions;

  constructor(private chartDataService: ChartDataService) {
    const fontFamily = '"Inter", sans-serif'; // Police globale

    this.chartOptions = {
      series: [],
      chart: {
        type: 'area',
        height: 240, // Ajustez selon l'espace disponible
        fontFamily: fontFamily,
        foreColor: '#6B7280', // Couleur du texte général (axes, etc.) - Gray-500
        toolbar: {
          show: false,
        },
        zoom: {
          // Désactiver le zoom si non nécessaire pour un look plus statique
          enabled: false,
        },
        animations: {
          enabled: true,
          speed: 800, // Vitesse globale de l'animation initiale
          animateGradually: {
            enabled: true,
            delay: 150,
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350,
          },
        },
      },
      colors: [], // Sera défini dynamiquement dans updateChart
      dataLabels: {
        enabled: false, // Souvent mieux de les désactiver pour un look plus propre
        // Si activé, stylisez-les :
        // style: {
        //   fontSize: '10px',
        //   fontFamily: fontFamily,
        //   fontWeight: 'bold',
        //   colors: ['#fff'] // Couleur du texte dans les labels
        // },
        // background: {
        //   enabled: true,
        //   foreColor: '#333', // Couleur du texte du label
        //   padding: 4,
        //   borderRadius: 3,
        //   borderWidth: 1,
        //   borderColor: 'rgba(0, 0, 0, 0.1)',
        //   opacity: 0.8,
        //   dropShadow: { enabled: false }
        // },
        // offsetY: -10, // Ajuster la position
      },
      stroke: {
        curve: 'smooth', // 'smooth', 'straight', 'stepline'
        width: 2.5, // Épaisseur de la ligne
        // lineCap: 'round' // Extrémités arrondies
      },
      fill: {
        type: 'gradient', // Un gradient subtil peut être joli
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.6,
          opacityTo: 0.2,
          stops: [0, 90, 100],
        },
        // colors: [] // Sera défini dynamiquement
      },
      markers: {
        size: 0, // Pas de marqueurs par défaut
        hover: {
          size: 5, // Marqueur visible au survol
          sizeOffset: 3,
        },
        // strokeColors: '#fff', // Bordure des marqueurs
        // strokeWidth: 2
      },
      xaxis: {
        categories: [],
        type: 'datetime', // Si vos 'dates' sont des timestamps ou des strings de date valides
        labels: {
          style: {
            fontFamily: fontFamily,
            fontWeight: 500,
            fontSize: '11px',
            colors: '#6B7280', // Gray-500
          },
          datetimeUTC: false, // Si vos dates sont locales
          // format: 'dd MMM', // Format d'affichage des dates
        },
        axisBorder: {
          show: false, // Pas de bordure d'axe X
        },
        axisTicks: {
          show: false, // Pas de ticks sur l'axe X
        },
        tooltip: {
          // Désactiver le tooltip par défaut de l'axe X si vous avez un tooltip de série
          enabled: false,
        },
      },
      yaxis: {
        labels: {
          style: {
            fontFamily: fontFamily,
            fontWeight: 500,
            fontSize: '11px',
            colors: '#6B7280', // Gray-500
          },
          formatter: function (value) {
            // Pour afficher des entiers si applicable
            return Math.round(value).toString();
          },
        },
        min: 0, // Assure que l'axe Y commence à 0
        // tickAmount: 4, // Nombre de graduations sur l'axe Y (optionnel)
      },
      grid: {
        show: true,
        borderColor: '#E5E7EB', // Couleur de la grille (Gray-200), très claire
        strokeDashArray: 4, // Lignes pointillées
        xaxis: {
          lines: {
            show: false, // Cacher les lignes verticales de la grille si l'axe X est temporel
          },
        },
        yaxis: {
          lines: {
            show: true, // Afficher les lignes horizontales
          },
        },
        padding: {
          // Un peu d'espace
          top: 5,
          right: 10,
          bottom: 5,
          left: 10,
        },
      },
      legend: {
        show: true,
        position: 'top', // 'top', 'bottom', 'left', 'right'
        horizontalAlign: 'right', // 'left', 'center', 'right'
        fontFamily: fontFamily,
        fontWeight: 500,
        fontSize: '12px',
        offsetY: -5,
        itemMargin: {
          horizontal: 10,
          vertical: 0,
        },
      },
      tooltip: {
        enabled: true,
        shared: true, // Un seul tooltip pour toutes les séries au même point X
        intersect: false, // Le tooltip s'affiche même si on ne survole pas directement un point
        theme: 'dark', // 'light' ou 'dark'. Ou personnalisez avec `custom`.
        style: {
          fontFamily: fontFamily,
          fontSize: '12px',
        },
        x: {
          // format: 'dd MMM yyyy' // Format de la date dans le tooltip
        },
        marker: {
          // Afficher les marqueurs de couleur des séries dans le tooltip
          show: true,
        },
        // custom: function({series, seriesIndex, dataPointIndex, w}) { // Pour un tooltip HTML complètement personnalisé
        //   let html = '<div class="custom-tooltip">';
        //   series.forEach((s, i) => {
        //     html += `<div><span style="color:${w.globals.colors[i]}">${w.globals.seriesNames[i]}:</span> ${s[dataPointIndex]}</div>`;
        //   })
        //   html += '</div>';
        //   return html;
        // }
      },
      title: {
        text: 'Évolution des Candidatures', // Titre plus général ou spécifique
        align: 'left',
        margin: 20, // Espace sous le titre
        style: {
          fontSize: '16px',
          fontWeight: '600',
          fontFamily: fontFamily,
          color: '#111827', // Presque noir (Gray-900)
        },
      },
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      'colonnes' in changes &&
      changes['colonnes'] &&
      this.colonnes.length > 0
    ) {
      this.updateChart();
    } else if ('colonnes' in changes && this.colonnes.length === 0) {
      // Gérer le cas où il n'y a plus de données
      this.chartOptions.series = [];
      this.chartOptions.xaxis.categories = [];
      // Vous pourriez afficher un message "Pas de données" via un autre moyen
    }
  }

  updateChart() {
    // Simuler des données d'historique pour l'exemple
    // Dans un cas réel, chartDataService.generateSeries devrait retourner
    // des séries avec plusieurs points de données (par date) pour chaque statut.
    const { series, dates } = this.chartDataService.generateSeriesWithHistory(
      this.colonnes,
      7,
    ); // ex: historique sur 7 jours

    const dynamicColors = series.map((serieItem) => {
      if (
        serieItem &&
        typeof serieItem === 'object' &&
        'name' in serieItem &&
        serieItem.name
      ) {
        return (
          this.modernColorMap.get(serieItem.name) ?? this.defaultChartColor
        );
      }
      return this.defaultChartColor; // Fallback si la structure n'est pas attendue
    });

    // Mise à jour des options du graphique
    this.chartOptions = {
      ...this.chartOptions, // Conserve les options par défaut
      series: series,
      xaxis: {
        ...this.chartOptions.xaxis,
        categories: dates,
        // Si les dates sont des timestamps ou des strings de date, ApexCharts peut les formater.
        // Sinon, formatez-les ici en strings lisibles si 'dates' contient des objets Date.
        // categories: dates.map(d => formatDate(d, 'dd MMM', 'en-US')),
      },
      colors: dynamicColors, // Appliquer les couleurs dynamiques
      // fill: { // Assurez-vous que fill utilise aussi les couleurs dynamiques si type: 'solid'
      //     ...this.chartOptions.fill,
      //     colors: dynamicColors
      // }
      // Si fill.type est 'gradient', ApexCharts utilise 'colors' par défaut pour les gradients.
    };
  }
}
