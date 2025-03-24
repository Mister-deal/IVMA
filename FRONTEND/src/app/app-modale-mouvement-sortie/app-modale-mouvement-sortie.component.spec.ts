import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppModaleMouvementSortieComponent } from './app-modale-mouvement-sortie.component';

describe('AppModaleMouvementSortieComponent', () => {
  let component: AppModaleMouvementSortieComponent;
  let fixture: ComponentFixture<AppModaleMouvementSortieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModaleMouvementSortieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppModaleMouvementSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
