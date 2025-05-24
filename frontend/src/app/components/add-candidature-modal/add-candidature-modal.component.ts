import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  type SimpleChanges,
} from '@angular/core';
import { Candidature } from 'app/models/candidature.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-candidature-modal',
  standalone: true,
  imports: [CommonModule, FormsModule], // selon les besoins
  templateUrl: './add-candidature-modal.component.html',
  styleUrls: ['./add-candidature-modal.component.css'],
})
export class AddCandidatureModalComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() defaultStatut = 'Pas de réponse';
  @Output() closeModal = new EventEmitter<void>();
  @Output() candidatureAdded = new EventEmitter<Candidature>();

  validStatuts = ['Pas de réponse', 'En cours', 'Refusé', 'Accepté'];
  candidature: Candidature = this.getDefaultCandidature();

  ngOnChanges(changes: SimpleChanges) {
    if ('isOpen' in changes && changes['isOpen'] && this.isOpen) {
      this.resetForm();
    }
  }
  
  resetForm() {
    this.candidature = this.getDefaultCandidature();
  }

  submitForm() {
    this.candidatureAdded.emit({ ...this.candidature });
    this.close();
  }

  close() {
    this.closeModal.emit();
    this.resetForm();
  }

  private getDefaultCandidature(): Candidature {
    const statut = this.validStatuts.includes(this.defaultStatut)
      ? this.defaultStatut
      : 'Pas de réponse';

    return {
      id: 0,
      entreprise: '',
      poste: '',
      date_candidature: new Date(),
      statut,
      commentaire: '',
    };
  }
}