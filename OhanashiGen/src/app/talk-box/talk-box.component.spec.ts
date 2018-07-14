import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalkBoxComponent } from './talk-box.component';

describe('TalkBoxComponent', () => {
  let component: TalkBoxComponent;
  let fixture: ComponentFixture<TalkBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalkBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalkBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
