import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../movies.model';

@Component({
  selector: 'app-tab-pills',
  templateUrl: './tab-pills.component.html',
  styleUrls: ['./tab-pills.component.scss']
})
export class TabPillsComponent implements OnInit {

  @Input()
  public tabs: Map<string, Category> = new Map();

  constructor() { }

  ngOnInit(): void {
  }

  get tabsList() {
    return Array.from(this.tabs.values());
  }

}
