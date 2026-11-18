import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTasksPage } from './list-tasks.page';

describe('ListTasksPage', () => {
  let component: ListTasksPage;
  let fixture: ComponentFixture<ListTasksPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTasksPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTasksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
