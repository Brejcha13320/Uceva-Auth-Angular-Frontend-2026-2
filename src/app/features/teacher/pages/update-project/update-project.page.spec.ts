import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProjectPage } from './update-project.page';

describe('UpdateProjectPage', () => {
  let component: UpdateProjectPage;
  let fixture: ComponentFixture<UpdateProjectPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateProjectPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateProjectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
