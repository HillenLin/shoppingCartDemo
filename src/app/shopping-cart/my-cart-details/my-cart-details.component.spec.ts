import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCartDetailsComponent } from './my-cart-details.component';

describe('MyCartDetailsComponent', () => {
  let component: MyCartDetailsComponent;
  let fixture: ComponentFixture<MyCartDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCartDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCartDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
