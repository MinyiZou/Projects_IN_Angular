import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../reservation/reservation.service';


@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup = new FormGroup({ });

  constructor(private formBuilder: FormBuilder, private reservationService: ReservationService, private router: Router, private activateRoute: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate:  ['', Validators.required],
      guestName:  ['', Validators.required],
      guestEmail:  ['', [Validators.required, Validators.email]],
      roomNumber:  ['', Validators.required]
    })

    let id = this.activateRoute.snapshot.paramMap.get('id');

    if (id) {
      let reservation  = this.reservationService.getReservation(id);

      if (reservation) {
        this.reservationForm.patchValue(reservation);
      }
    }
  }
  

  onSubmit() {
    if (this.reservationForm.valid) {
      let id = this.activateRoute.snapshot.paramMap.get('id')
      if (id) {
        this.reservationService.updateReservation(id, this.reservationForm.value);
      } else {
        this.reservationService.addReservation(this.reservationForm.value);
      }
      this.router.navigate(['/list']);
    }
  }
}