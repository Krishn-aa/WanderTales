import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import User from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})

export class HeaderComponent implements OnInit {
  user: User | null = null;
  dropdownVisible = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.user$.subscribe((user: User | null) => {
      if (user) {
        this.user = user;
      }
    });
    this.userService.fetchUserDetails();
  }

  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  logout(): void {
    sessionStorage.clear();
    this.userService.clearUser();
    this.router.navigate(['/login']);
  }
}
