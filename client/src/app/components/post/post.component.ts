import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import User from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  postForm: any;
  postAdded: boolean = false;
  user: User | null = null;

  dropdownVisible = false;
  constructor(private userService: UserService,private formBuilder: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.userService.user$.subscribe((user: User | null) => {
      if (user) {
        this.user = user;
      }
    });
    this.userService.fetchUserDetails();
    this.postForm = this.formBuilder.group({
      location: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  submitPost(): void {
    if (this.postForm.valid) {
      this.apiService.post('posts/add', this.postForm.value).subscribe(
        (response: any) => {
          console.log(response.location);
          this.postAdded = true; 
        },
        (error) => {
          alert('Error');
          console.error('Error', error);
        }
      );
    } else {
      alert('Form is invalid');
    }
  }

  addAnotherPost(): void {
    this.postAdded = false;
    this.postForm.reset();
  }
}