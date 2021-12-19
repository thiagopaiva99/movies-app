import { Component, OnInit } from '@angular/core';
import { first, tap } from 'rxjs';
import { Serie } from 'src/app/core/models';
import { SeriesService } from '../../../../core/services/series.service';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.scss']
})
export class SeriesListComponent implements OnInit {

  public series: Serie[] = [];
  public isLoading = true;
  private currentPage = 1;

  constructor(private seriesService: SeriesService) { }

  ngOnInit(): void {
    this.loadSeries();
  }

  onScroll() {
    if (this.isLoading) {
      return
    }

    this.currentPage++
    this.loadSeries();
  }

  private loadSeries() {
    this.isLoading = true
    this.seriesService.getSeries(this.currentPage)
      .pipe( tap(() => this.isLoading = false), first())
      .subscribe(series => this.series.push(...series));
  }

}
