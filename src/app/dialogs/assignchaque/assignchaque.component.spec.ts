import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignchaqueComponent } from './assignchaque.component';

describe('AssignchaqueComponent', () => {
  let component: AssignchaqueComponent;
  let fixture: ComponentFixture<AssignchaqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignchaqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignchaqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
