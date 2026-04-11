
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';
import {
  NbInputModule,
  NbButtonModule,
  NbCardModule,
  NbSpinnerModule,
  NbLayoutModule,
} from '@nebular/theme';
 
function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { mismatch: true };
  }
  return null;
}
 
@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
 
  loading = false;
  errorMsg = '';
 
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
 
  registerForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName:  ['', [Validators.required]],
    email:     ['', [Validators.required, Validators.email]],
    password:  ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
  }, { validators: passwordMatchValidator });
 
  get f() {
    return this.registerForm.controls;
  }
 
  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.errorMsg = '';
    this.auth
      .register({
        firstName: this.f['firstName'].value!,
        lastName: this.f['lastName'].value!,
        email: this.f['email'].value!,
        password: this.f['password'].value!,
      })
      .subscribe({
        next: () => {
          this.loading = false;
          void this.router.navigate(['/pending-approval']);
        },
        error: (e: Error) => {
          this.loading = false;
          this.errorMsg = e.message;
        },
      });
  }
}
 