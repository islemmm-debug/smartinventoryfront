import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';
import { environment } from '../../../../environment/environment';
import {
  NbInputModule,
  NbButtonModule,
  NbCardModule,
  NbSpinnerModule,
  NbLayoutModule,
} from '@nebular/theme';
 
@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    NbInputModule,
    NbButtonModule,
    NbCardModule,
    NbSpinnerModule,
    NbLayoutModule,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
 
  loading   = false;
  emailSent = false;
  errorMsg  = '';
 
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
 
  forgotForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });
 
  get f() {
    return this.forgotForm.controls;
  }
 
  onSubmit() {
    if (this.forgotForm.invalid) {
      this.forgotForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.errorMsg = '';
    const email = this.f['email'].value!;

    if (environment.useMockAuth) {
      setTimeout(() => {
        this.loading = false;
        this.emailSent = true;
      }, 800);
      return;
    }

    this.auth.forgotPassword(email).subscribe({
      next: () => {
        this.loading = false;
        this.emailSent = true;
      },
      error: (e: Error) => {
        this.loading = false;
        this.errorMsg = e.message;
      },
    });
  }
 
  resend() {
    this.emailSent = false;
  }
}