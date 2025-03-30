import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenuProduitComponent } from './contenu.component';

describe('ContenuProduitComponent', () => {
  let component: ContenuProduitComponent;
  let fixture: ComponentFixture<ContenuProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenuProduitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenuProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
