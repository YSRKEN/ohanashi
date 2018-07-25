import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalkBoxDoubleComponent } from './talk-box-double.component';

describe('TalkBoxDoubleComponent', () => {
  let component: TalkBoxDoubleComponent;
  let fixture: ComponentFixture<TalkBoxDoubleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalkBoxDoubleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalkBoxDoubleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
