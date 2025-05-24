import { formatDate } from "@angular/common";
import { Injectable } from "@angular/core";
import { Colonne } from "app/models/column.model";

@Injectable({ providedIn: 'root' })
export class ChartDataService {
  generateSeries(colonnes: Colonne[]): { series: any[], dates: string[] } {
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
            (c) => formatDate(c.date_candidature, 'yyyy-MM-dd', 'fr') === dateStr,
          ).length
      );
      return { name: col.titre, data };
    });

    return { series, dates: allDates };
  }
}
