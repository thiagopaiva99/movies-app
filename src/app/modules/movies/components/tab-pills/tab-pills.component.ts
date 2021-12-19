import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../movies.model';

@Component({
  selector: 'app-tab-pills',
  templateUrl: './tab-pills.component.html',
  styleUrls: ['./tab-pills.component.scss']
})
export class TabPillsComponent implements OnInit {

  @Input()
  public tabs!: Map<string, Category>;

  @Output()
  private onTabChange = new EventEmitter<string>();

  public activeTab!: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const category = this.activatedRoute.snapshot.params['category'];
    this.activeTab = this.tabs.has(category)
      ? this.tabs.get(category)?.apiValue
      : this.tabs.entries().next().value[1].apiValue;
  }

  onTabClick(tab: Category) {
    this.activeTab = tab.apiValue;
    for (const currentTab of this.tabs) {
      if (currentTab[1].apiValue === tab.apiValue) {
        this.onTabChange.emit(currentTab[0]);
        break;
      }
    }
  }

  get tabsList() {
    return Array.from(this.tabs.values());
  }

}
