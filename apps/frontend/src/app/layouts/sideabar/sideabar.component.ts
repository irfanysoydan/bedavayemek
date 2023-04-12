/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'bedavayemek-sideabar',
  templateUrl: './sideabar.component.html',
  styleUrls: ['./sideabar.component.scss'],
})
export class SideabarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  logout() {
    localStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
  }
}
