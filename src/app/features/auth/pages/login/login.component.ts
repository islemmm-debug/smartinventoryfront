import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import {
  NbInputModule,
  NbButtonModule,
  NbCheckboxModule,
  NbCardModule,
  NbSpinnerModule,
  NbLayoutModule,
} from '@nebular/theme';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,           
    ReactiveFormsModule,     // ✅ fixes formGroup

    // ✅ Nebular modules
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbCardModule,
    NbSpinnerModule,
    NbLayoutModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  loading = false;

  private fb = inject(FormBuilder);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [true],
  });

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    setTimeout(() => {
      console.log('Login success:', this.loginForm.value);
      this.loading = false;
    }, 1500);
  }
}
