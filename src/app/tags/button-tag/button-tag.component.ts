import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button-tag',
  standalone: true,
  imports: [],
  templateUrl: './button-tag.component.html'
})
export class ButtonTagComponent {
 constructor(private router: Router) { }

 addTag() {
  this.router.navigate(['tag/add']);
 }
}
