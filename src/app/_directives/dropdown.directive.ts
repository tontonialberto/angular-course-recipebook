import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

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

  private _openDropdown: boolean = false;

  private get openDropdown() { 
    return this._openDropdown; 
  }

  private set openDropdown(open: boolean) {
    if(open) {
      this.renderer.addClass(this.elementRef.nativeElement, 'open');
    }
    else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'open');
    }
    this._openDropdown = open;
  }

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.openDropdown = false;
  }

  ngOnInit() {
    this.renderer.listen('document', 'click', (event: PointerEvent) => {
      if(!this.elementRef.nativeElement.contains(event.target)) {
        this.openDropdown = false;
      }
    })
  }
  
  @HostListener('click') onClick() {
    this.openDropdown = !this.openDropdown;
  }

  @HostListener('document:click') onOutsideClick() {
    
  }
}
