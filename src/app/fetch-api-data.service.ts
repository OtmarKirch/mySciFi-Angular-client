import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators'; // original code: import { catchError, map } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://quiet-bastion-19832-9b36523e0b42.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})


export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
  
  /**
   * Register a new user
   * @param userDetails - name, username, password, email
   * @returns user object
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users/register', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Login a user
   * @param userDetails - username, password
   * @returns user object and token
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Get all movies
   * @param userDetails - token
   * @returns {Observable<any>} list of all movies
   */
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

  
  /**
   * Get one movie
   * @param title 
   * @returns {Observable<any>} movie object
   */
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

  /**
   * Get genre of movie
   * @param {string} title of movie
   * @returns {Observable<any>} genre object
   */
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

  /**
   * Get director of movie
   * @param {string} title of movie
   * @returns {Observable<any>} director object
   */
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

  /**
   * Update username
   * @param userDetails - old username, new username
   * @returns {Observable<any>} user object
   */
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

  /**
   * Update user details
   * @param userDetails - username, name, email
   * @returns {Observable<any>} user object
   */
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

  /**
   * Update password
   * @param userDetails 
   * @returns {Observable<any>} user object
   */
  public updatePassword(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const changePasswordUrl = apiUrl + 'users/newpassword';
    return this.http.put(changePasswordUrl, userDetails, {
      responseType: "text",
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map((response: string) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
 
  /**
   * Delete user
   * @param userDetails 
   * @returns {Observable<any>} user deleted message
   */
  public deleteUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/delete?Username=' + userDetails.Username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map((response: any) => this.extractResponseData(response)),
      catchError(this.handleError)
    );
  }

  /**
   * Add movie to favorites
   * @param userDetails 
   * @returns {Observable<any>} user object
   */
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
  /**
   * Remove movie from favorites
   * @param userDetails
   * @returns {Observable<any>} user object
   * */
  public removeFavorite(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/favoritemovie/', {
      body: userDetails,
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


