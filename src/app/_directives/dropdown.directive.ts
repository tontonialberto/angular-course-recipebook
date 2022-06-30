import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

/**
 * This directive can be used to toggle visibility of a Bootstrap 3 dropdown.
 * The dropdown will be closed if user clicks outside the dropdown.
 * 
 * Usage:
 * 1. Put the directive on the dropdown.
 * 
 * Example:
 *  <div appDropdown class="dropdown">
 *    ...
 *  </div>
 */
@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.open') openDropdown = false;

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
  }
  
  @HostListener('click') onClick(): void {
    this.openDropdown = !this.openDropdown;
  }

  @HostListener('document:click', ['$event']) 
  onOutsideClick(event: PointerEvent): void {
    // Close dropdown whenever user clicks on other parts of the document
    if(!this.elementRef.nativeElement.contains(event.target)) {
      this.openDropdown = false;
    }
  }
}
