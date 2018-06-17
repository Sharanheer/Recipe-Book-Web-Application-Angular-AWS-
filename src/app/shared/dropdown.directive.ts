import { Directive, HostListener, HostBinding } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective{
    @HostBinding('class.open') state: boolean = false;

    @HostListener('click') openWindow(){
        this.state = !this.state;
    } 
    
}