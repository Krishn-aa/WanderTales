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
          sessionStorage.setItem('id',response.user.id);

          this.router.navigate(['/main']);
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
