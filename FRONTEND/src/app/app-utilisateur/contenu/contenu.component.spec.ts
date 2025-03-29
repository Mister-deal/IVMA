import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenuUtilisateurComponent } from './contenu.component';

describe('ContenuUtilisateurComponent', () => {
  let component: ContenuUtilisateurComponent;
  let fixture: ComponentFixture<ContenuUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenuUtilisateurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenuUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
