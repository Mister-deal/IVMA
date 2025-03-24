import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFormInscriptionComponent } from './app-form-inscription.component';

describe('AppFormInscriptionComponent', () => {
  let component: AppFormInscriptionComponent;
  let fixture: ComponentFixture<AppFormInscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppFormInscriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppFormInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
