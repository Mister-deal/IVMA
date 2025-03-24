import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppModaleMouvementEntreeComponent } from './app-modale-mouvement-entree.component';

describe('AppModaleMouvementEntreeComponent', () => {
  let component: AppModaleMouvementEntreeComponent;
  let fixture: ComponentFixture<AppModaleMouvementEntreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModaleMouvementEntreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppModaleMouvementEntreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
