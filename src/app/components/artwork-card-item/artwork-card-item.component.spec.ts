import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ArtworkCardItemComponent } from './artwork-card-item.component'

describe('ArtworkCardItemComponent', () => {
  let component: ArtworkCardItemComponent
  let fixture: ComponentFixture<ArtworkCardItemComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtworkCardItemComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtworkCardItemComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
