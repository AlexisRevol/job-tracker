import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationsComponent } from './applications.component';
import { provideHttpClient } from '@angular/common/http';
import { CandidatureService } from 'app/services/CandidatureService';
import { of } from 'rxjs';
import { Candidature } from 'app/models/candidature.model';

describe('ApplicationsComponent', () => {
  let component: ApplicationsComponent;
  let fixture: ComponentFixture<ApplicationsComponent>;
  let candidatureServiceSpy: jasmine.SpyObj<CandidatureService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj(
      'CandidatureService',
      ['addCandidature', 'moveCandidature'],
      {
        colonnes$: of([
          { titre: 'À faire', candidatures: [] },
          { titre: 'En cours', candidatures: [] },
        ]),
      },
    );

    await TestBed.configureTestingModule({
      imports: [ApplicationsComponent],
      providers: [
        provideHttpClient(),
        { provide: CandidatureService, useValue: spy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ApplicationsComponent);
    component = fixture.componentInstance;
    candidatureServiceSpy = TestBed.inject(
      CandidatureService,
    ) as jasmine.SpyObj<CandidatureService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize colonnes from service', () => {
    expect(component.colonnes.length).toBe(2);
    expect(component.colonnes[0].titre).toBe('À faire');
  });

  it('should open modal with given column title', () => {
    component.openModalForColumn('Test Column');
    expect(component.modalState.isOpen).toBeTrue();
    expect(component.modalState.title).toBe('Test Column');
  });

  it('should close the modal', () => {
    component.modalState.isOpen = true;
    component.modalState.title = 'Test';
    component.closeModal();
    expect(component.modalState.isOpen).toBeFalse();
    expect(component.modalState.title).toBe('');
  });

  it('should handle new candidature and close modal', () => {
    const candidature: Candidature = {
      id: 1,
      entreprise: 'TestCorp',
      poste: 'Dev',
      date_candidature: new Date(),
      statut: 'À faire',
    };

    component.modalState.isOpen = true;
    component.modalState.title = 'À faire';

    component.handleNewCandidature(candidature);

    expect(candidatureServiceSpy.addCandidature).toHaveBeenCalledWith(
      candidature,
    );
    expect(component.modalState.isOpen).toBeFalse();
    expect(component.modalState.title).toBe('');
  });

  it('should call moveCandidature when candidature is moved', () => {
    const event = {
      candidature: {
        id: 1,
        entreprise: 'TestCorp',
        poste: 'Dev',
        date_candidature: new Date(),
        statut: 'À faire',
      },
      ancienStatut: 'À faire',
      nouveauStatut: 'En cours',
    };

    component.onCandidatureMove(event);
    expect(candidatureServiceSpy.moveCandidature).toHaveBeenCalledWith(
      event.candidature,
      event.ancienStatut,
      event.nouveauStatut,
    );
  });
});
