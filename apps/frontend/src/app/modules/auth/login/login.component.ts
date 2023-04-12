/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'bedavayemek-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}
  isLoading = false;
  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  login() {
    this.isLoading = true;

    if (this.form.invalid) {
      this._snackBar.open('Lütfen tüm alanları doldurun.', 'Tamam', {
        duration: 3000,
      });
      this.isLoading = false;
      return;
    }

    const auth = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.authService.loginService(auth).subscribe((data) => {
      if (!data.isSuccessful) {
        this._snackBar.open(data.message, 'Tamam', {
          duration: 2000,
        });
        this.isLoading = false;
        return;
      }
      this._snackBar.open(data.message, 'Tamam', {
        duration: 2000,
      });
      localStorage.setItem('accessToken', data.data.accessToken);
      this.router.navigateByUrl('/');
      this.isLoading = false;
    });
  }

  ngOnInit(): void {}
}
