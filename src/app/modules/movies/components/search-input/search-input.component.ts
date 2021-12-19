import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit, OnDestroy {

  private readonly destroyed$ = new Subject();

  @Input()
  public useSearchButton = true;

  @Output()
  public onSearch = new EventEmitter<string>()

  @Input()
  public initialValue!: string;

  public input = new FormControl()

  constructor() { }

  ngOnInit(): void {
    this.input.setValue(this.initialValue, { emitEvent: false });

    if (!this.useSearchButton) {
      this.input.valueChanges.pipe(
        debounceTime(250),
        distinctUntilChanged(),
        takeUntil(this.destroyed$)
      ).subscribe(value => {
        this.onSearchEvent()
      })
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.complete();
  }

  onSearchEvent() {
    this.onSearch.emit(this.input.value)
  }

}
