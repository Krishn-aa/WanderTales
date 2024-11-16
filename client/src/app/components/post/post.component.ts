import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import User from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  postForm: any;
  postAdded: boolean = false;
  user: User | null = null;

  uploadedFiles: File[] = [];
  imagePreviews: string[] = [];

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.userService.user$.subscribe((user: User | null) => {
      if (user) {
        this.user = user;
      }
    });
    this.userService.fetchUserDetails();

    this.postForm = this.formBuilder.group({
      location: ['', [Validators.required]],
      description: ['', [Validators.required]],
      media: [[]], // Store multiple files
    });
  }

  submitPost(): void {
    if (this.postForm.valid) {
      const formData = new FormData();
      formData.append('location', this.postForm.value.location);
      formData.append('description', this.postForm.value.description);

      // Append all selected files to the FormData
      this.uploadedFiles.forEach((file, index) => {
        formData.append('media', file);
      });

      this.apiService.post('posts/add', formData).subscribe(
        (response: any) => {
          console.log('Post added successfully', response);
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
    this.uploadedFiles = [];
    this.imagePreviews = [];
  }

  onFilesChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      Array.from(input.files).forEach((file) => {
        this.uploadedFiles.push(file);

        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            this.imagePreviews.push(e.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      });

      // Update the form value with selected files
      this.postForm.patchValue({ media: this.uploadedFiles });
    }
  }
}
