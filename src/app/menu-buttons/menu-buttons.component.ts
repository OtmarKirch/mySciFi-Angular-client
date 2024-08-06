import { Component, OnInit } from '@angular/core';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu-buttons',
  templateUrl: './menu-buttons.component.html',
  styleUrl: './menu-buttons.component.scss'
})
export class MenuButtonsComponent {
  constructor(
    public dialog: MatDialog,
    public router: Router
  ) {}

  openUserProfileDialog(): void {
    this.dialog.open(UserProfileComponent, {
      width: '280px',
    });
  }

  openMovieOverview(): void {
    this.router.navigate(['movies']);
  }

  openUsersFavorites(): void {
    this.router.navigate(['favorites']);
  }

  logoutUser(): void {
    sessionStorage.clear();
    localStorage.removeItem('token');
    this.router.navigate(['welcome']);
  }
}
