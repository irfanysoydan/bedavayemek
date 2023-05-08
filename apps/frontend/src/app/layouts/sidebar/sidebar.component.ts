/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Auth } from '../../models/auth.model';

@Component({
  selector: 'bedavayemek-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SideabarComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.getAuth();
  }

  isLoading = false;
  isLoaded = false;
  auth!: Auth;

  logout() {
    localStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
  }

  getAuth() {
    return this.authService.getAuth().subscribe((data) => {
      if (!data.isSuccessful) {
        this.isLoading = false;
        return;
      }
      this.auth = data.data.username;
      this.isLoading = false;
      this.isLoaded = true;
    });
  }
}
