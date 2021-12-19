import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss']
})
export class InfiniteScrollComponent implements OnInit, OnDestroy {

  @Input()
  public options = {};

  @Output()
  private scrolled = new EventEmitter();

  @ViewChild('anchor', { static: true })
  public anchor!: ElementRef<HTMLElement>;

  private observer!: IntersectionObserver;

  constructor(private host: ElementRef) { }

  ngOnInit() {
    const options = {
      root: this.isHostScrollable() ? this.host.nativeElement : null,
      rootMargin: "0px",
      threshold: 1.0,
      ...this.options
    };

    this.observer = new IntersectionObserver(([entry]) => {
      entry.isIntersecting && this.scrolled.emit('scrolled');
    }, options);

    this.observer.observe(this.anchor.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }

  private isHostScrollable() {
    const style = window.getComputedStyle(this.element);

    return style.getPropertyValue('overflow') === 'auto' ||
      style.getPropertyValue('overflow-y') === 'scroll';
  }

  get element() {
    return this.host.nativeElement;
  }

}
