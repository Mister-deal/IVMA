import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenuReapprovisionnementComponent } from './contenu.component';

describe('ContenuReapprovisionnementComponent', () => {
  let component: ContenuReapprovisionnementComponent;
  let fixture: ComponentFixture<ContenuReapprovisionnementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenuReapprovisionnementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenuReapprovisionnementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
