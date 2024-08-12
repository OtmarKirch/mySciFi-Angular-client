import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { FetchApiDataService } from '../fetch-api-data.service';
import { DetailsViewComponent } from '../details-view/details-view.component';

@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrl: './favorite-movies.component.scss'
})
export class FavoriteMoviesComponent {
  movies: any[] = [];
  favoriteMovies: any[] = [];
  favoriteMoviesList: any[] = [];

  /**
   * Shows the favorite movies of the user.
   * @param fetchApiData 
   * @param dialog 
   * @param router 
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router
  ) {}

  /**
   * The list of favorite movies of the user is set as an array of movie ids.
   */
  setFavoriteMoviesList(): void {
    this.favoriteMoviesList = this.movies.filter((movie) => movie.favorite);
  }


  ngOnInit(): void {
    this.getMovies();
  }

  //get all movies
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
    this.tagFavoriteMovies();
      return this.movies;
    });
  }

  //get movie ids of favorite movies from user details
  getFavoriteMoviesUser(): object {
    let userDetails = JSON.parse(sessionStorage.getItem('userDetails')!);
    this.favoriteMovies = userDetails.favoriteMovies;
    console.log(this.favoriteMovies);
    return this.favoriteMovies;
  }

  //determines for each movie whether it is a favorite of the user
  tagFavoriteMovies(): void {
    this.getFavoriteMoviesUser();
    this.movies.forEach((movie) => {
      movie.favorite = false;
      this.favoriteMovies.forEach((favoriteMovie) => {
        if (movie._id === favoriteMovie) {
          movie.favorite = true;
        }
      });
    });
    this.setFavoriteMoviesList();
  }

  //opens a dialog box with details of a movie
  openMovieDetailsDialog(kindOfDetails: string, movie: any): void {
    this.dialog.open(DetailsViewComponent, {
      data: {
        kindOfDetails,
        movie,
      },
      width: '500px',
    });
  }

  //adds or removes a movie from the list of favorite movies of the user
  addDeleteFavoriteMovie(movie: any): void {
    const icon = document.getElementById(`${movie._id}-icon`);
    const reqData = { favoriteMovie: movie.title };
    if (!movie.favorite) {
      icon?.setAttribute("fontIcon", "favorite");
    this.fetchApiData.addFavorite(reqData).subscribe((resp: any) => {
      console.log(resp.favoriteMovies);
      sessionStorage.setItem('userDetails', JSON.stringify(resp));
      this.tagFavoriteMovies();
    });
    } else if (movie.favorite) {
      console.log("movie is on the list of favorites");
      this.fetchApiData.removeFavorite(reqData).subscribe((resp: any) => {
        icon?.setAttribute("fontIcon", "favorite_border");
        console.log(resp.favoriteMovies);
        sessionStorage.setItem('userDetails', JSON.stringify(resp));
        this.tagFavoriteMovies();
      });

    }
  }

}
