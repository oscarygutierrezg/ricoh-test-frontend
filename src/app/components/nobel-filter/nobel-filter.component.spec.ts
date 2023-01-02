import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NobelFilterComponent } from './nobel-filter.component';

describe('NobelFilterComponent', () => {
  let component: NobelFilterComponent;
  let fixture: ComponentFixture<NobelFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NobelFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NobelFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
