import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ElectronService } from '../core/services';
import { AuthService } from '../core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  islogged!: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private electronService: ElectronService,
  ) { }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.islogged = isLoggedIn;
      console.log('Login status changed:', this.islogged);
    });
  }

  isElectron() {
    if(this.electronService.isElectron) {
      return true;
    } else {
      return false;
    }
  }

  close() {
    window.close()
  }

  minimize() {
    //window.minimizeWindow();
  }

  goConfig() {
    this.router.navigateByUrl('/config');
  }

  logout() {
    this.authService.lougout();
    this.router.navigateByUrl('/login');
  }
}
