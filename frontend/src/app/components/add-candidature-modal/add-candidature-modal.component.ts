import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
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
export class AddCandidatureModalComponent {
  @Input() isOpen: boolean = false;
  @Input() defaultStatut: string = 'Pas de réponse';
  @Output() closeModal = new EventEmitter<void>();
  @Output() candidatureAdded = new EventEmitter<Candidature>()

  validStatuts = ['Pas de réponse', 'En cours', 'Refusé', 'Accepté'];
  candidature: Candidature = {
    id: 0,
    entreprise: '',
    poste: '',
    date_candidature: new Date(),
    statut: 'Pas de réponse',
    commentaire: '',
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isOpen'] && this.isOpen) {
      // Modal s'ouvre : on reset la candidature avec le statut par défaut
      this.resetForm();
    }
  }

  resetForm() {
    const statutParDefaut = this.defaultStatut && this.validStatuts.includes(this.defaultStatut) 
                            ? this.defaultStatut 
                            : 'Pas de réponse';

    this.candidature = {
      id: 0,
      entreprise: '',
      poste: '',
      date_candidature: new Date(),
      statut: statutParDefaut,
      commentaire: '',
    };
  }

  submitForm() {
    this.candidatureAdded.emit({...this.candidature});
    this.close();
  }

  close() {
    this.closeModal.emit();
  }
}
