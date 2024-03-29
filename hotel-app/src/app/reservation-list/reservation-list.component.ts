import { Component } from '@angular/core';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../reservation/reservation.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent {
  reservations: Reservation[] = []

  constructor(private reservationService: ReservationService) { }

  ngOnInit() {
    this.reservationService.getReservations().subscribe(
      reservations => this.reservations = reservations
    );
  }

  deleteReservation(id: string) {
    this.reservationService.deleteReservation(id).subscribe(
      reservation => this.reservations.find(res => res.id === reservation.id) 
    ); 
    // this.reservations = this.reservationService.getReservations();
  }

}

