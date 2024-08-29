import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: any;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      this.apiService.post('login', this.loginForm.value).subscribe(
        (response: any) => { 
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('firstName', response.user.firstName);
          sessionStorage.setItem('lastName', response.user.lastName);

          // Redirect to home page
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Login error:', error);
          alert('Invalid email or password');
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
