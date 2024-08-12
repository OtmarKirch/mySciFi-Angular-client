
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';




@Component({
  selector: 'app-details-view',
  templateUrl: './details-view.component.html',
  styleUrl: './details-view.component.scss'
})
export class DetailsViewComponent {
  
  title: string = '';
  name: string = '';
  description: string = '';

  /**
   * The DetailsViewComponent class contains methods to extract data from the movie object and display it in the dialog box.
   */
  constructor(@Inject(MAT_DIALOG_DATA)
  public data: {
    kindOfDetails: string,
    movie: any
  },
    public dialogRef: MatDialogRef<DetailsViewComponent>
  ) { }


  ngOnInit(): void {
    this.extractData();
  }

  /**
   * Extracts data from the movie object and assigns it to the title, name, and description properties.
   */
  extractData(): void {
    const movieData = this.data.movie;
    this.title = this.data.movie.title;
    switch (this.data.kindOfDetails) {
      case 'genre':
        this.name = movieData.genre.name;
        this.description = movieData.genre.description;
        break;
      case 'director':
        this.name = movieData.director.name;
        this.description = movieData.director.description;
        break;
      case 'synopsis':
        this.name = movieData.title;
        this.description = movieData.description;
        break;
      default:
        break;
    }
  }

  /**
   * Closes the dialog box.
   */
  closeDialog(): void {
    this.dialogRef.close();
  }
}