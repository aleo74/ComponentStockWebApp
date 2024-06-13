import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
})
export class ButtonComponent {

  constructor(private router: Router) { }

  addStock() {
    this.router.navigate(['stock/add']);
  }

}
