import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WsscanTesterComponent } from './wsscan-tester.component';

describe('WsscanTesterComponent', () => {
  let component: WsscanTesterComponent;
  let fixture: ComponentFixture<WsscanTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WsscanTesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WsscanTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
