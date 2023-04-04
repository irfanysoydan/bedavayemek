import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Auth } from '../../../models/auth.model';

@Component({
  selector: 'bedavayemek-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit(): void {}

  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    if (!firstName || !lastName || !email || !password) {
      alert('Lütfen tüm alanları doldurunuz');

      return;
    } else {
      const auth: Auth = new Auth();

      auth.firstName = firstName;
      auth.lastName = lastName;
      auth.email = email;
      auth.password = password;

      console.log(auth);
      this.authService
        .registerService({ firstName, lastName, email, password })
        .subscribe((res) => {
          if (res) {
            alert('Kayıt başarılı');
            console.log(res);
            this.router.navigate(['/login']);
          }
        });
    }
  }
}
