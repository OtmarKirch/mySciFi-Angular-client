import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators'; // original code: import { catchError, map } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://quiet-bastion-19832-9b36523e0b42.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})

// Register new user
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users/register', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // User login
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  //get all movies
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map((response: any) => this.extractResponseData(response)), // original code: map(this.extractResponseData)
      catchError(this.handleError)
    );
  }
  // Non-typed response extraction
  private extractResponseData(res: Response): any {
    const body = res;
    return body || {};
  }

  // Get one movie
  public getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map((response: any) => this.extractResponseData(response)),
      catchError(this.handleError)
    );
  }

  // Get genre of movie
  public getGenre(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre' + title, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map((response: any) => this.extractResponseData(response)),
      catchError(this.handleError)
    );
  }

  // Get director of movie
  public getDirector(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/director' + title, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map((response: any) => this.extractResponseData(response)),
      catchError(this.handleError)
    );
  }

  // Update user name
  public updateUsername(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/newusername', userDetails, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map((response: any) => this.extractResponseData(response)),
      catchError(this.handleError)
    );
  }

  // Update user details
  public updateUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/newdetails', userDetails, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map((response: any) => this.extractResponseData(response)),
      catchError(this.handleError)
    );
  }

  // Update password
  public updatePassword(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/newpassword', userDetails, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map((response: any) => this.extractResponseData(response)),
      catchError(this.handleError)
    );
  }

  // Delete user
  public deleteUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/delete?Username=' + userDetails.Username,{
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map((response: any) => this.extractResponseData(response)),
      catchError(this.handleError)
    );
  }

  // Add movie to favorites
  public addFavorite(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + 'users/favoritemovie/', userDetails, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map((response: any) => this.extractResponseData(response)),
      catchError(this.handleError)
    );
  }

  // Remove movie from favorites
  public removeFavorite(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/favoritemovie?favoriteMovie=' + userDetails.favoriteMovie, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map((response: any) => this.extractResponseData(response)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}


