import type { Candidature } from "app/models/candidature.model";

export interface Colonne {
	titre: string;
	candidatures: Candidature[];
}
