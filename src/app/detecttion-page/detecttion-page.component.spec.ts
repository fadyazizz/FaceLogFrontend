import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetecttionPageComponent } from './detecttion-page.component';

describe('DetecttionPageComponent', () => {
  let component: DetecttionPageComponent;
  let fixture: ComponentFixture<DetecttionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetecttionPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetecttionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
