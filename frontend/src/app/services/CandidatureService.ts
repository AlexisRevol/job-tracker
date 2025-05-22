import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Colonne } from '../models/column.model';
import { Candidature } from '../models/candidature.model';

@Injectable({ providedIn: 'root' })
export class CandidatureService {
  private apiUrl = 'http://localhost:8000/candidatures';

  private colonnesSubject = new BehaviorSubject<Colonne[]>(this.mockData());
  colonnes$ = this.colonnesSubject.asObservable();

  private mockData(): Colonne[] {
    return [
      {
        titre: 'Pas de réponse',
        candidatures: [
          {
            id: 1,
            entreprise: 'OpenAI',
            poste: 'Développeur Backend',
            date_candidature: new Date('2025-05-01'),
            statut: 'Pas de réponse',
            commentaire: 'Envoyé par LinkedIn',
          },
        ],
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
            commentaire: 'Test technique passé',
          },
        ],
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
            commentaire: 'Mail de refus reçu',
          },
        ],
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
            commentaire: 'Contrat signé',
          },
        ],
      },
    ];
  }

  constructor(private http: HttpClient) {}

  getColonnes(): Colonne[] {
    return this.colonnesSubject.getValue();
  }

  addCandidature(c: Candidature) {
    const colonnes = this.getColonnes();
    const colonne = colonnes.find((col) => col.titre === c.statut);

    if (colonne) {
      colonne.candidatures.push(c);
    } else {
      colonnes.push({ titre: c.statut, candidatures: [c] });
    }

    this.colonnesSubject.next([...colonnes]); // clone pour déclencher changement
  }

  moveCandidature(c: Candidature, ancienStatut: string, nouveauStatut: string) {
    const colonnes = this.getColonnes();

    const source = colonnes.find((col) => col.titre === ancienStatut);
    const target = colonnes.find((col) => col.titre === nouveauStatut);

    if (!source || !target) {return;}

    source.candidatures = source.candidatures.filter(
      (cand) => cand.id !== c.id,
    );
    c.statut = nouveauStatut;
    target.candidatures.push(c);

    this.colonnesSubject.next([...colonnes]);
  }

  getCandidaturesFromServer() {
    return this.http.get<Candidature[]>(this.apiUrl);
  }

  createCandidature(c: Candidature) {
    return this.http.post<Candidature>(this.apiUrl, c);
  }
}
