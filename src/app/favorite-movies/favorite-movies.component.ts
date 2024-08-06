import { Component, OnInit } from '@angular/core';
import { UserProfileComponent } from '../user-profile/user-profile.component';
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
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
    this.getFavoriteMoviesUser();
    this.tagFavoriteMovies();
    this.setFavoriteMoviesList();
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
    this.movies.forEach((movie) => {
      this.favoriteMovies.forEach((favoriteMovie) => {
        if (movie._id === favoriteMovie) {
          movie.favorite = true;
        }
      });
    });
  }

  setFavoriteMoviesList(): void {
    this.favoriteMoviesList = this.movies.filter((movie) => movie.favorite);
    console.log(this.favoriteMovies);
  }

  openMovieDetailsDialog(kindOfDetails: string, movie: any): void {
    console.log(kindOfDetails);
    console.log(movie);
    this.dialog.open(DetailsViewComponent, {
      data: {
        kindOfDetails,
        movie,
      },
      width: '500px',
    });
  }

  addDeleteFavoriteMovie(movie: any): void {
    console.log(movie);
    console.log(movie.title);
    const reqData = { favoriteMovie: movie.title };
    if (!movie.favorite) {
    
    this.fetchApiData.addFavorite(reqData).subscribe((resp: any) => {
      console.log(resp.favoriteMovies);
      sessionStorage.setItem('userDetails', JSON.stringify(resp));
      this.tagFavoriteMovies();
      alert('Added to favorites!');
    });
    } else if (movie.favorite) {
      console.log("movie is on the list of favorites");
      this.fetchApiData.removeFavorite(reqData).subscribe((resp: any) => {
        console.log(resp.favoriteMovies);
        sessionStorage.setItem('userDetails', JSON.stringify(resp));
        this.tagFavoriteMovies();
        alert('Removed from favorites!');
      });

    }
  }

  openUserProfileDialog(): void {
    this.dialog.open(UserProfileComponent, {
      width: '280px',
    });
  }

  openMovieOverview(): void {
    this.router.navigate(['movies']);
  }
}
