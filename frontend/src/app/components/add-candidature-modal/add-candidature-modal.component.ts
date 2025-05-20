import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() closeModal = new EventEmitter<void>();
  @Output() candidatureAdded = new EventEmitter<Candidature>()

  candidature: Candidature = {
    id: 0,
    entreprise: '',
    poste: '',
    date_candidature: new Date(),
    statut: 'Pas de réponse',
    commentaire: '',
  };

  submitForm() {
    this.candidatureAdded.emit({...this.candidature});
    this.close();
  }

  close() {
    this.closeModal.emit();
  }
}
