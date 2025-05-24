import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { Colonne } from 'app/models/column.model';
import { ApexAxisChartSeries } from 'ng-apexcharts'; // Assurez-vous que c'est bien importé

@Injectable({ providedIn: 'root' })
export class ChartDataService {
  generateSeries(colonnes: Colonne[]): { series: any[]; dates: string[] } {
    const allDatesSet = new Set<string>();
    for (const col of colonnes) {
      for (const c of col.candidatures) {
        allDatesSet.add(formatDate(c.date_candidature, 'yyyy-MM-dd', 'fr'));
      }
    }
    const allDates = Array.from(allDatesSet).sort();

    const series = colonnes.map((col) => {
      const data = allDates.map(
        (dateStr) =>
          col.candidatures.filter(
            (c) =>
              formatDate(c.date_candidature, 'yyyy-MM-dd', 'fr') === dateStr,
          ).length,
      );
      return { name: col.titre, data };
    });

    return { series, dates: allDates };
  }

  generateSeriesWithHistory(
    colonnes: Colonne[],
    historyLength: number = 7,
  ): { series: ApexAxisChartSeries; dates: (string | number)[] } {
    // Modifiez le type de dates ici
    const rawDatesArray: Date[] = [];
    for (let i = historyLength - 1; i >= 0; i--) {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() - i);
      rawDatesArray.push(d);
    }

    // Pour xaxis.categories, utilisez des timestamps (recommandé) ou des strings ISO
    // const categoryDates = rawDatesArray.map(d => d.getTime()); // OPTION 1: Timestamps
    const categoryDates = rawDatesArray.map((d) => d.toISOString()); // OPTION 2: Strings ISO

    const seriesData: ApexAxisChartSeries = [];

    for (const col of colonnes) {
      const dataPoints: number[] = new Array(categoryDates.length).fill(0);

      rawDatesArray.forEach((currentDateObj, index) => {
        // Normaliser currentDateObj pour la comparaison (déjà fait lors de la création)
        // currentDateObj.setHours(0,0,0,0); // Inutile si déjà fait

        const countAtDate = col.candidatures.filter((cand) => {
          if (!cand.date_candidature) {
            return false;
          }
          const candDate = new Date(cand.date_candidature);
          candDate.setHours(0, 0, 0, 0); // Normaliser la date de la candidature
          // Compare les dates jusqu'au jour J inclus
          return candDate <= currentDateObj;
        }).length;
        dataPoints[index] = countAtDate;
      });
      seriesData.push({ name: col.titre, data: dataPoints });
    }

    return { series: seriesData, dates: categoryDates };
  }
}
