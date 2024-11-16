import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';
import User from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private apiService: ApiService) {}

  fetchUserDetails(): void {
    const id = sessionStorage.getItem('id');
    if (id) {
      this.apiService.get('users/' + id).subscribe(
        (data: User) => {
          this.userSubject.next(data);

          sessionStorage.setItem('firstName', data.firstName);
          sessionStorage.setItem('lastName', data.lastName);
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
    } else {
      console.log("No id");
    }
  }

  clearUser(): void {
    this.userSubject.next(null);
  }
}
