import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ArtworkCardListComponent } from './artwork-card-list.component'

describe('ArtworkCardListComponent', () => {
  let component: ArtworkCardListComponent
  let fixture: ComponentFixture<ArtworkCardListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtworkCardListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtworkCardListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
