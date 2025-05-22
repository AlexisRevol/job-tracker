import {
	Component,
	Input,
	Output,
	EventEmitter,
	OnChanges,
	type SimpleChanges,
	OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgApexchartsModule } from "ng-apexcharts";
import { formatDate } from "@angular/common";
import type { Colonne } from "app/models/column.model";
import type {
	ApexAxisChartSeries,
	ApexChart,
	ApexXAxis,
	ApexDataLabels,
	ApexStroke,
	ApexMarkers,
	ApexYAxis,
	ApexGrid,
	ApexTitleSubtitle,
	ApexFill,
	ApexTooltip,
} from "ng-apexcharts";

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
};

@Component({
	selector: "app-spline-area-chart",
	standalone: true,
	imports: [CommonModule, NgApexchartsModule],
	templateUrl: "./spline-area-chart.component.html",
	styleUrl: "./spline-area-chart.component.css",
})
export class SplineAreaChartComponent {
	@Input() colonnes: Colonne[] = [];

	private colors = ["#687d8c", "#00ff00", "#0000ff", "#ffff00"];
	private colorMap = new Map<string, string>([
		["Pas de réponse", "#4778AE"],
		["En cours", "#637D3F"],
		["Refusé", "#E3C8CD"],
		["Accepté", "#86753F"],
	]);

	public chartOptions: ChartOptions;

	constructor() {
		this.chartOptions = {
			series: [],
			chart: {
				type: "area",
				height: 350,
				toolbar: { show: false },
			},
			dataLabels: { enabled: true },
			stroke: { curve: "smooth" },
			fill: { opacity: 0.7, colors: this.colors },
			markers: { size: 0 },
			xaxis: { categories: [] },
			tooltip: { shared: true, intersect: false },
			title: { text: "Nombre de candidatures par statut", align: "left" },
			grid: { borderColor: "#f1f1f1" },
			yaxis: { labels: { style: { colors: "#333" } } },
		};
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes["colonnes"]) {
			this.updateChart();
		}
	}

	updateChart() {
		// Récupérer toutes les dates uniques au format 'yyyy-MM-dd'
		const allDatesSet = new Set<string>();
		this.colonnes.forEach((col) => {
			col.candidatures.forEach((c) => {
				allDatesSet.add(formatDate(c.date_candidature, "yyyy-MM-dd", "fr"));
			});
		});
		const allDates = Array.from(allDatesSet).sort();

		// Pour chaque colonne (statut), compter les candidatures par date
		const series = this.colonnes.map((col) => {
			const data = allDates.map(
				(dateStr) =>
					col.candidatures.filter(
						(c) =>
							formatDate(c.date_candidature, "yyyy-MM-dd", "fr") === dateStr,
					).length,
			);
			return {
				name: col.titre,
				data: data,
			};
		});

		const colors = this.colonnes.map(
			(col) => this.colorMap.get(col.titre) ?? "#000000",
		);

		this.chartOptions.series = series;
		this.chartOptions.xaxis.categories = allDates;
		this.chartOptions.fill = {
			opacity: 0.7,
			colors: colors,
		};
	}
}
