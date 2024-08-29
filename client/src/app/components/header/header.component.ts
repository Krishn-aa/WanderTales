import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  userName: string | null = null;
  dropdownVisible = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const firstName = sessionStorage.getItem('firstName');
    const lastName = sessionStorage.getItem('lastName');
    if (firstName && lastName) {
      this.userName = `${firstName} ${lastName}`;
    }
  }

  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('firstName');
    sessionStorage.removeItem('lastName');
    this.router.navigate(['/login']);
  }
}
