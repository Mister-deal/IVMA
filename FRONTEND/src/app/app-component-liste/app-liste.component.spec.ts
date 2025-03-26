import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppListeComponent } from './app-liste.component';

describe('AppListeComponent', () => {
  let component: AppListeComponent;
  let fixture: ComponentFixture<AppListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppListeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
