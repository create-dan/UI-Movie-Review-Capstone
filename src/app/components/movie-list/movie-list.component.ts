import { Component } from '@angular/core';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { ImageRendererComponent } from '../renderers/image-renderer/image-renderer';
import { ButtonRendererComponent } from '../renderers/button-renderer/button-renderer';
import { MovieService } from 'src/app/services/movie/movie.service';
import { MovieListDto } from '../models/MovieListDto';


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {
  private gridApi!: GridApi;
  rowData: MovieListDto[] = [];

  constructor(public movieService: MovieService) {

  }

  ngOnInit() {
    this.movieService.getMoviesWithDetails().subscribe(data => {
      this.rowData = data;
    });
  }

  colDefs: ColDef[] = [
    { field: 'image', cellRenderer: 'imageRenderer', width: 150, headerName: 'Poster' },
    { field: 'movieName', width: 300, headerName: 'Movie Name' },
    { field: 'averageRating', width: 100, headerName: 'Rating' },
    { field: 'totalReviews', width: 150, headerName: 'Total Reviews' },
    { field: 'viewButton', width: 150, headerName: 'View Movie', cellRenderer: 'buttonRenderer' }
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
      buttonRenderer: ButtonRendererComponent
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
