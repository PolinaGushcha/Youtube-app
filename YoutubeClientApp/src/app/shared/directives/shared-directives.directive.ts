import { Directive } from '@angular/core';

@Directive({
  selector: '[appSharedDirectives]',
  standalone: true
})
export class SharedDirectivesDirective {

  constructor() { }

}
