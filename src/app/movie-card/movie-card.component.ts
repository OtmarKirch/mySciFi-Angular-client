// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { MatDialog } from '@angular/material/dialog';

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
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMoviesUser();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      this.tagFavoriteMovies();
      console.log(this.movies);
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
    this.dialog.open(DetailsViewComponent, {
      data: {
        kindOfDetails,
        movie,
      },
      width: '500px',
    });
  }

  addFavoriteMovie(movieTitle: string): void {
    console.log(movieTitle);
    const reqData = { favoriteMovie: movieTitle };
    this.fetchApiData.addFavorite(reqData).subscribe((resp: any) => {
      console.log(resp.favoriteMovies);
      sessionStorage.setItem('userDetails', JSON.stringify(resp));
      this.tagFavoriteMovies();
      alert('Added to favorites!');
    });
  }

  openUserProfileDialog(): void {
    this.dialog.open(UserProfileComponent, {
      width: '280px',
    });
  }
}
