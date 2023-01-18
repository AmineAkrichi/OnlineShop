import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopFrontComponent } from './shop-front.component';

describe('ShopFrontComponent', () => {
  let component: ShopFrontComponent;
  let fixture: ComponentFixture<ShopFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
