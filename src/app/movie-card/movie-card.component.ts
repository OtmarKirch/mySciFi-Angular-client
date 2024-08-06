// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { FetchApiDataService } from '../fetch-api-data.service';
import { DetailsViewComponent } from '../details-view/details-view.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  movies: any[] = [];
  favoriteMovies: any[] = [];
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
      return this.movies;
    });
  }

  getFavoriteMoviesUser(): object {
    let userDetails = JSON.parse(sessionStorage.getItem('userDetails')!);
    this.favoriteMovies = userDetails.favoriteMovies;
    console.log(this.favoriteMovies);
    return this.favoriteMovies;
  }

  //determines for each movie whether it is a favorite of the user
  tagFavoriteMovies(): void {
    //console.log(this.movies);
    this.movies.forEach((movie) => {
      this.favoriteMovies.forEach((favoriteMovie) => {
        if (movie._id === favoriteMovie) {
          movie.favorite = true;
        }
      });
    });
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
      alert(movie.title + ' was added to your favorites!');
    });
    } else if (movie.favorite) {
      console.log("movie is on the list of favorites");
      this.fetchApiData.removeFavorite(reqData).subscribe((resp: any) => {
        console.log(resp.favoriteMovies);
        sessionStorage.setItem('userDetails', JSON.stringify(resp));
        this.tagFavoriteMovies();
        alert(movie.title + ' was remove from your favorites!');
      });

    }
  }

  openUserProfileDialog(): void {
    this.dialog.open(UserProfileComponent, {
      width: '280px',
    });
  }

  openUsersFavorites(): void {
    this.router.navigate(['favorites']);
  }
}
