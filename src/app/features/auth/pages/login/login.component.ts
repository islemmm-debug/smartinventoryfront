import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';
import { environment } from '../../../../environment/environment';
import {
  NbInputModule, NbButtonModule, NbCheckboxModule,
  NbCardModule, NbSpinnerModule, NbLayoutModule,
} from '@nebular/theme';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterLink,
    NbInputModule, NbButtonModule, NbCheckboxModule,
    NbCardModule, NbSpinnerModule, NbLayoutModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  private fb     = inject(FormBuilder);
  private auth   = inject(AuthService);
  private router = inject(Router);

  /** Quand `true`, aucun appel API : voir `environment.useMockAuth`. */
  readonly useMockAuth = environment.useMockAuth;

  loading  = false;
  errorMsg = '';

  loginForm = this.fb.group({
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [true],
  });

  get f() { return this.loginForm.controls; }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading  = true;
    this.errorMsg = '';

    this.auth.login({
      email:    this.f['email'].value!,
      password: this.f['password'].value!,
    }).subscribe({
      next: () => {
        this.loading = false;
        const role = this.auth.getRole();
        if (role === 'Admin') {
          void this.router.navigate(['/dashboard']);
        } else {
          void this.router.navigate(['/movements']);
        }
      },
      error: (err: Error) => {
        this.loading  = false;
        this.errorMsg = err.message;
      },
    });
  }
}