export interface Candidature {
  id: number;
  entreprise: string;
  poste: string;
  date_candidature: Date;
  statut: string;
  commentaire?: string;
}