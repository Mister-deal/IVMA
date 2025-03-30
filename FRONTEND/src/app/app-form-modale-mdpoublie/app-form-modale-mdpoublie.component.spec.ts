import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormModaleMdpoublieComponent } from './app-form-modale-mdpoublie.component';

describe('FormModaleMdpoublieComponent', () => {
  let component: FormModaleMdpoublieComponent;
  let fixture: ComponentFixture<FormModaleMdpoublieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormModaleMdpoublieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormModaleMdpoublieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
