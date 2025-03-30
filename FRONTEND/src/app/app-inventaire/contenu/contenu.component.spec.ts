import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenuInventaireComponent } from './contenu.component';

describe('ContenuInventaireComponent', () => {
  let component: ContenuInventaireComponent;
  let fixture: ComponentFixture<ContenuInventaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenuInventaireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenuInventaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
