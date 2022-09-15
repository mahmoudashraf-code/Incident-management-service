import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

import { EditedComponent } from './edited.component';

describe('EditedComponent ==> user', () => {
  let component: EditedComponent;
  let fixture: ComponentFixture<EditedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditedComponent],
      imports: [HttpClientTestingModule, MatDialogModule, RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
