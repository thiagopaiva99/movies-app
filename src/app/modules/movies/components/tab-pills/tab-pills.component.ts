import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '../../movies.model';

@Component({
  selector: 'app-tab-pills',
  templateUrl: './tab-pills.component.html',
  styleUrls: ['./tab-pills.component.scss']
})
export class TabPillsComponent implements OnInit {

  @Input()
  public tabs: Map<string, Category> = new Map();

  @Output()
  private onTabChange = new EventEmitter<Category>();

  public activeTab: string | undefined;

  constructor() { }

  ngOnInit(): void {
    this.activeTab = this.tabs.entries().next().value[1].apiValue;
  }

  onTabClick(tab: Category) {
    this.activeTab = tab.apiValue;
    this.onTabChange.emit(tab);
  }

  get tabsList() {
    return Array.from(this.tabs.values());
  }

}
