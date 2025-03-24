import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFormConnexionComponent } from './app-form-connexion.component';

describe('AppFormConnexionComponent', () => {
  let component: AppFormConnexionComponent;
  let fixture: ComponentFixture<AppFormConnexionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppFormConnexionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppFormConnexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
