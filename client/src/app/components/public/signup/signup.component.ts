import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  userForm: any;
  selectedFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0] || null;
  }

  submitForm(): void {
    if (this.userForm?.valid) {
      const formData = new FormData();
      formData.append('firstName', this.userForm.value.firstName);
      formData.append('lastName', this.userForm.value.lastName);
      formData.append('email', this.userForm.value.email);
      formData.append('username', this.userForm.value.username);
      formData.append('password', this.userForm.value.password);
      if (this.selectedFile) {
        formData.append('profilePic', this.selectedFile);
      }

      this.apiService.post('register', formData).subscribe(
        (response) => {
          alert('Registration successful:');
        },
        (error) => {
          alert('Error');
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}