import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../core/class/user';
import { AuthService } from '../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  user: User;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService : AuthService, private router: Router) {
    this.user = new User();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.logging(this.user).subscribe({
      next: (isLoggedIn) => {
        if (isLoggedIn) {
          this.router.navigateByUrl('/home');
        }
      },
      error: (error) => {
        this.errorMessage = 'Login failed';
      }
    });
  }
}