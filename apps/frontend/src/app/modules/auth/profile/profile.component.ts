/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { Auth } from '../../../models/auth.model';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'bedavayemek-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username')!;
    this.getAuth();
  }

  auth!: Auth;
  username = '';
  isLoading = false;
  isLoaded = false;
  dataURI = '';

  form = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  getAuth() {
    this.isLoading = true;
    this.authService.getAuth().subscribe((data) => {
      if (!data.isSuccessful) {
        this.isLoading = false;
        return;
      }
      this.auth = data.data;
      this.dataURI = this.auth.avatar!;
      this.form.patchValue({
        firstName: this.auth.firstName,
        lastName: this.auth.lastName,
        username: this.auth.username,
        email: this.auth.email,
      });
      this.isLoading = false;
      this.isLoaded = true;
    });
  }

  editUser() {
    if (this.form.invalid || this.dataURI === '') {
      this._snackBar.open('Lütfen tüm alanları doldurun.', 'Tamam', {
        duration: 3000,
      });
      return;
    }
    this.isLoading = true;

    const auth: any = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      username: this.form.value.username,
      password: this.form.value.password,
      avatar: this.dataURI,
    };
    console.log(auth);
    this.authService
      .updateUserProfile(this.username, auth)
      .subscribe((data) => {
        if (!data.isSuccessful) {
          this._snackBar.open(data.message, 'Tamam', {
            duration: 2000,
          });
          this.isLoading = false;
          return;
        }
        this.isLoading = false;
        this.router.navigate(['/profile', this.username]);
        this._snackBar.open('Kullanıcı başarıyla güncellendi.', 'Tamam', {
          duration: 2000,
        });
      });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result) {
        this.dataURI = reader.result.toString();
      }
    };
  }
}
