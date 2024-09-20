import { Component } from '@angular/core';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { ImageRendererComponent } from '../renderers/image-renderer/image-renderer';
import { ButtonRendererComponent } from '../renderers/button-renderer/button-renderer';
import { MovieService } from 'src/app/services/movie/movie.service';
import { MovieListDto } from '../models/MovieListDto';
import { StarRatingComponentComponent } from '../renderers/star-rating-component/star-rating-component.component';
import { AuthService } from 'src/app/services/authenticatin/auth.service';
import { UserProfileService } from 'src/app/services/user-profile/user-profile.service';


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {
  private gridApi!: GridApi;
  rowData: MovieListDto[] = [];

  constructor(public movieService: MovieService,public authService:AuthService,public userProfileService:UserProfileService) {

  }

  ngOnInit() {
    this.movieService.getMoviesWithDetails().subscribe(data => {
      this.rowData = data;
      console.log(this.rowData)
    });
  }

  colDefs: ColDef[] = [
    { field: 'image', cellRenderer: 'imageRenderer', width: 100, headerName: 'Poster' ,sortable:false},
    { field: 'movieName', width: 100, headerName: 'Movie Name' },
    { field: 'averageRating', width: 100, headerName: 'Rating',valueFormatter: params => params.value === 0 ? -1 : params.value },
    { field: 'totalReviews', width: 100, headerName: 'Total Reviews',valueFormatter: params => params.value === 0 ? -1 : params.value },
    { field: 'viewButton', width: 100, headerName: 'View Details', cellRenderer: 'buttonRenderer',sortable:false}
  ];



  gridOptions: GridOptions = {
    rowHeight: 80,
    rowStyle: { 'border-bottom': 'white 20px solid' },
    suppressRowClickSelection: true,
    suppressCellFocus: true,
    columnDefs: this.colDefs,
    defaultColDef: { resizable: true },
    components: {
      imageRenderer: ImageRendererComponent,
      buttonRenderer: ButtonRendererComponent,
      starRatingRenderer: StarRatingComponentComponent
    }
  };

  onGridReady(params: any) {
    this.gridApi = params.api,
      this.gridApi.sizeColumnsToFit()
  }

  onFilterTextBoxChanged() {
    this.gridApi.setGridOption(
      "quickFilterText",
      (document.getElementById("filter-text-box") as HTMLInputElement).value,
    );
  }


}
