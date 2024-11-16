import { Component } from '@angular/core';
import User from '../../models/user';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  user: User = new User();

  editMode: boolean = false;

  
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.user$.subscribe((user: User | null) => {
      if (user) {
        this.user = user;
      }
    });
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  saveProfile() {
    // Save updated profile logic
    console.log('Profile saved:', this.user);
    this.editMode = false;
  }

  cancelEdit() {
    // Logic to reset changes
    this.editMode = false;
  }
}
