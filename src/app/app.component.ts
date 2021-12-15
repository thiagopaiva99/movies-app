import { Component, OnInit } from '@angular/core';
import { Configuration } from './core/models/configuration';
import { ConfigurationService } from './core/services/configuration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private configurationService: ConfigurationService) {}

  ngOnInit(): void {
    this.configurationService.setConfiguration()
  }
}
