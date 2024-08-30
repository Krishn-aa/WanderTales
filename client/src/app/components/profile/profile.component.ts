import { Component } from '@angular/core';
import User from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  user: User | null = null;

  dropdownVisible = false;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.user$.subscribe((user: User | null) => {
      if (user) {
        this.user = user;
      }
    });
  }
}
