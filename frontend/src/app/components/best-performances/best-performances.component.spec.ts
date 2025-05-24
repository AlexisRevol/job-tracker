import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestPerformancesComponent } from './best-performances.component';

describe('BestPerformancesComponent', () => {
  let component: BestPerformancesComponent;
  let fixture: ComponentFixture<BestPerformancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestPerformancesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BestPerformancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
