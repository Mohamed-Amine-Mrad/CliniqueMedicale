import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationEdit } from './consultation-edit';

describe('ConsultationEdit', () => {
  let component: ConsultationEdit;
  let fixture: ComponentFixture<ConsultationEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultationEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultationEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
