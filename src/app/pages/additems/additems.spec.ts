import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Additems } from './additems';

describe('Additems', () => {
  let component: Additems;
  let fixture: ComponentFixture<Additems>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Additems]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Additems);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
