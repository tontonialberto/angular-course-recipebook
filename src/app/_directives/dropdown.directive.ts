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

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.openDropdown = false;
  }

  ngOnInit() {
    // Close dropdown whenever user clicks on other parts of the document
    this.renderer.listen('document', 'click', (event: PointerEvent) => {
      if(!this.elementRef.nativeElement.contains(event.target)) {
        this.openDropdown = false;
      }
    });
  }
  
  @HostListener('click') onClick() {
    this.openDropdown = !this.openDropdown;
  }
}
