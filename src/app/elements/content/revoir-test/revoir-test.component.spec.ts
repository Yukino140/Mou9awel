import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevoirTestComponent } from './revoir-test.component';

describe('RevoirTestComponent', () => {
  let component: RevoirTestComponent;
  let fixture: ComponentFixture<RevoirTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevoirTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevoirTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
