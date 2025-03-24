import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFormModaleMdpoublieComponent } from './app-form-modale-mdpoublie.component';

describe('AppFormModaleMdpoublieComponent', () => {
  let component: AppFormModaleMdpoublieComponent;
  let fixture: ComponentFixture<AppFormModaleMdpoublieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppFormModaleMdpoublieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppFormModaleMdpoublieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
