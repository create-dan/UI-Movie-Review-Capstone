import { Component } from '@angular/core';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {
  private gridApi!: GridApi;

  colDefs: ColDef[] = [
    { field: 'image', cellRenderer: 'imageRenderer', width: 150, headerName: 'Poster' },
    { field: 'title', width: 300, headerName: 'Movie Name' },
    { field: 'rating', width: 100, headerName: 'Rating' },
    { field: 'totalReviews', width: 150, headerName: 'Total Reviews' },
    { field: 'viewButton', width: 150, headerName: 'View Movie', cellRenderer: 'buttonRenderer' }
  ];

  rowData: any[] = [
    {
      image: 'https://media.themoviedb.org/t/p/w533_and_h300_bestv2/mKOBdgaEFguADkJhfFslY7TYxIh.jpg',
      title: 'Movie 1',
      rating: 4.5,
      totalReviews: 123,
      viewButton: 'View Details'
    },
    {
      image: 'https://image.tmdb.org/t/p/w500/posterPath2.jpg',
      title: 'Movie 2',
      rating: 3.8,
      totalReviews: 87,
      viewButton: 'View Details'
    },
    {
      image: 'https://image.tmdb.org/t/p/w500/posterPath3.jpg',
      title: 'Movie 3',
      rating: 4.2,
      totalReviews: 156,
      viewButton: 'View Details'
    },
    {
      image: 'https://image.tmdb.org/t/p/w500/posterPath4.jpg',
      title: 'Movie 4',
      rating: 4.9,
      totalReviews: 234,
      viewButton: 'View Details'
    }
  ];

  gridOptions: GridOptions = {
    rowHeight: 80,
    columnDefs: this.colDefs,
    defaultColDef: { resizable: true }
    
  };

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }
}
