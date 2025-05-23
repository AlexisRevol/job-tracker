import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationColumnComponent } from './application-column.component';
import { By } from '@angular/platform-browser';
import * as DragDropUtils from '@angular/cdk/drag-drop'; // <-- import * as
import { Candidature } from 'app/models/candidature.model';
import {
  DragDropModule,
  CdkDragDrop,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

describe('ApplicationColumnComponent', () => {
  let component: ApplicationColumnComponent;
  let fixture: ComponentFixture<ApplicationColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationColumnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ApplicationColumnComponent);
    component = fixture.componentInstance;
    component.title = 'À faire';
    component.candidatures = [
      {
        id: 1,
        entreprise: 'TestCorp',
        poste: 'Dev',
        date_candidature: new Date(),
        statut: 'À faire',
      },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit addCandidatureClick with column title on button click', () => {
    spyOn(component.addCandidatureClick, 'emit');
    const button = fixture.debugElement.query(By.css('.add-candidature-btn'));
    button.triggerEventHandler('click');
    expect(component.addCandidatureClick.emit).toHaveBeenCalledWith('À faire');
  });

  it('should move item within same container', () => {
    const date = new Date();

    component.candidatures = [
      {
        id: 1,
        entreprise: 'A',
        poste: 'Dev',
        date_candidature: date,
        statut: 'À faire',
      },
      {
        id: 2,
        entreprise: 'B',
        poste: 'QA',
        date_candidature: date,
        statut: 'À faire',
      },
    ];

    fixture.detectChanges(); // assure-toi qu'Angular détecte les changements

    const event: CdkDragDrop<Candidature[]> = {
      previousContainer: { data: component.candidatures } as any,
      container: { data: component.candidatures } as any,
      previousIndex: 0,
      currentIndex: 1,
      item: {} as any,
      isPointerOverContainer: true,
      distance: { x: 0, y: 0 },
      dropPoint: { x: 0, y: 0 },
      event: {} as any,
    };

    console.log(
      'Before:',
      component.candidatures.map((c) => c.id),
    );
    component.onDrop(event);
    console.log(
      'After:',
      component.candidatures.map((c) => c.id),
    );

    // Vérifie bien l’ordre
    expect(component.candidatures[0].id).toBe(2);
    expect(component.candidatures[1].id).toBe(1);
  });

  it('should emit candidatureMove when item moved to another container', () => {
    const newColumnTitle = 'En cours';
    component.title = newColumnTitle;

    const candidature: Candidature = {
      id: 2,
      entreprise: 'AutreCorp',
      poste: 'Testeur',
      date_candidature: new Date(),
      statut: 'À faire',
    };

    const event: CdkDragDrop<Candidature[]> = {
      previousContainer: { data: [candidature] } as any,
      container: { data: [] } as any,
      previousIndex: 0,
      currentIndex: 0,
      item: {} as any,
      isPointerOverContainer: true,
      distance: { x: 0, y: 0 },
      dropPoint: { x: 0, y: 0 },
      event: {} as any,
    };

    spyOn(component.candidatureMove, 'emit');

    component.onDrop(event);

    expect(component.candidatureMove.emit).toHaveBeenCalledWith({
      candidature,
      ancienStatut: 'À faire',
      nouveauStatut: 'En cours',
    });
  });
});
