import { Component, OnInit, Input } from '@angular/core';

// Import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// Import to bring in the API call created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// Import to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';


import { Router } from '@angular/router';



@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit{

  @Input() userData = { Username: '', Password: '' }

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }
  
  ngOnInit(): void {
  }

  // Function responsible for sending the form inputs to the backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      //Logic for a successful user login
      console.log(result);
      this.dialogRef.close(); // Will close modal on success (To be implemented)
      this.snackBar.open('User login successful', 'OK', {
        duration: 2000
      });
      localStorage.setItem('token', result.token);
      sessionStorage.setItem("userDetails", JSON.stringify(result.user));
      this.router.navigate(['movies']);
    }, (result) => {
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

}