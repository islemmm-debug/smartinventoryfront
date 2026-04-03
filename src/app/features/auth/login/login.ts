import { Component } from '@angular/core';
import { NbLayoutModule, NbCardModule, NbCheckboxModule, NbSpinnerModule } from "@nebular/theme";
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [NbLayoutModule, NbCardModule, NbCheckboxModule, NbSpinnerModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
loginForm: any;
onSubmit: any;
loading: any;
}
