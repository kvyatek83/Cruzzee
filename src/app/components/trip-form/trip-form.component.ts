import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TripDescription } from 'src/app/models/trip-description';

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.scss']
})
export class TripFormComponent {

  @Output() tripCreated = new EventEmitter<TripDescription>();

  tripForm = this.fb.group({
    departureDate: ['', Validators.required],
    vesselContents: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) {
  }

  submit() {
    this.tripCreated.emit({
      departureDate: this.departureDate.value,
      vesselContents: this.vesselContents.value
    });
  }

  get departureDate() {
    return this.tripForm.get('departureDate');
  }

  get vesselContents() {
    return this.tripForm.get('vesselContents');
  }
}
