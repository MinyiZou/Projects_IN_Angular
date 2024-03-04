import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservation: Reservation[]  = []

  constructor() {
    let data = localStorage.getItem('reservations');
    if (data) {
      this.reservation = JSON.parse(data);
    }
  }

  // CRUD
  getReservations(): Reservation[] {
    return this.reservation;
  }

  getReservation(id: string): Reservation | undefined {
    return this.reservation.find(res => res.id === id);
  }

  addReservation(reservation: Reservation): void {
    reservation.id = Date.now().toString();
    this.reservation.push(reservation);
    localStorage.setItem('reservations', JSON.stringify(this.reservation));
  }

  deleteReservation(id: string): void {
    let index = this.reservation.findIndex(res => res.id === id)
    this.reservation.splice(index, 1);
    localStorage.setItem('reservations', JSON.stringify(this.reservation));
  }

  updateReservation(id: string, reservation: Reservation): void {
    reservation.id = id;
    let index = this.reservation.findIndex(res => res.id === id)
    this.reservation[index] = reservation;
    localStorage.setItem('reservations', JSON.stringify(this.reservation));
  }
}
