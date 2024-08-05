import { Component, OnInit, Input } from '@angular/core';


// Import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// Import to bring in the API call created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// Import to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';


import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  // array for dealing with user details in this component
  userDetails: any = {};

  //input from user to change details
  @Input() userData = {
    name: '',
    Username: '',
    email: '',
  }

  //input from user to change password
  @Input() userPassword = {
    Password: ''
  }

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserProfileComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getUser();
  }

  // Function to get user details
  getUser(): void {
    this.userDetails = JSON.parse(sessionStorage.getItem('userDetails') || '')
      ;
    console.log(this.userDetails);
  };


  // Function responsible for sending the form inputs to the backend
  changeUserDetails(): void {
    console.log(this.userData);

    // If details have changed put them into local storage
    this.userDetails = {
      name: this.userData.name ? this.userData.name : this.userDetails.name,
      Username: this.userData.Username ? this.userData.Username : this.userDetails.Username,
      email: this.userData.email ? this.userData.email : this.userDetails.email
    }; 
    sessionStorage.setItem("userDetails", JSON.stringify(this.userDetails));
    
    this.fetchApiData.updateUser(this.userDetails).subscribe((result) => {
      //Logic for a successful change of user data
      console.log(result);
      console.log("User details changed successful");
      this.dialogRef.close(); // Will close modal on success (To be implemented)
      this.snackBar.open('User details changed successful', 'OK', {

        duration: 2000
      });
    }, (result) => {
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

  changeUserPassword(): void {
    console.log(this.userPassword);
    this.fetchApiData.updatePassword(this.userPassword).subscribe((result) => {
      //Logic for a successful change of user data
      console.log(result);
      console.log("User details changed successful");
      this.dialogRef.close(); // Will close modal on success (To be implemented)
      this.snackBar.open('User details changed successful', 'OK', {

        duration: 2000
      });
    }, (result) => {
      console.log("change password failed. Error meassage: " + result);
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }


}
