import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPaginate]'
})
export class AppPaginateDirective {
  @Input() appPaginateOf: number[] = [];

  @Input() appPaginatePerPage = 10;

  @Input() appPaginateControls?: TemplateRef<any>;

  private page = 1;
  private pages = 1;
  
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) {
    console.log(templateRef);
    console.log(viewContainerRef);
  }

  public ngOnChanges(): void {
    this.render();
  }

  private render(): void {
    this.viewContainerRef.clear();

    const { page } = this;
    const list = this.appPaginateOf;
    const perPage = this.appPaginatePerPage;

    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    for (let i = startIndex; i < list.length && i < endIndex; i++) {
      const itemContext = { $implicit: list[i] };
      this.viewContainerRef.createEmbeddedView(this.templateRef, itemContext);
    }

    const totalLength = list.length;
    const pages = totalLength === 0 ? 1 : Math.ceil(totalLength / perPage);
    this.pages = pages;

    if (this.appPaginateControls) {
      const controlsContext = {
        page,
        pages,
        previousPage: () => {
          this.previousPage();
        },
        nextPage: () => {
          this.nextPage();
        },
      };
      this.viewContainerRef.createEmbeddedView(
        this.appPaginateControls,
        controlsContext
      );
    }
  }

  private previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.render();
    }
  }

  private nextPage(): void {
    if (this.page < this.pages) {
      this.page++;
      this.render();
    }
  }

}
