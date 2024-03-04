import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservation: Reservation[]  = []
  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }
  // constructor() {
  //   let data = localStorage.getItem('reservations');
  //   if (data) {
  //     this.reservation = JSON.parse(data);
  //   }
  // }

  // CRUD
  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.url + '/reservations');
  }

  getReservation(id: string): Observable<Reservation> {
    return this.http.get<Reservation>(this.url + '/reservations/'+id);
    // return this.reservation.find(res => res.id === id);
  }

  addReservation(reservation: Reservation): Observable<void> {
    // reservation.id = Date.now().toString();
    // this.reservation.push(reservation);
    // localStorage.setItem('reservations', JSON.stringify(this.reservation));

    return this.http.post<void>(this.url + '/reservations', reservation);
  }

  deleteReservation(id: string): Observable<Reservation> {
    // let index = this.reservation.findIndex(res => res.id === id)
    // this.reservation.splice(index, 1);
    // localStorage.setItem('reservations', JSON.stringify(this.reservation));
    return this.http.delete<Reservation>(this.url + '/reservations/'+id);
  }

  updateReservation(id: string, reservation: Reservation): Observable<void> {
    // reservation.id = id;
    // let index = this.reservation.findIndex(res => res.id === id)
    // this.reservation[index] = reservation;
    // localStorage.setItem('reservations', JSON.stringify(this.reservation));
    return this.http.put<void>(this.url + '/reservations/'+id, reservation);
  }
}
