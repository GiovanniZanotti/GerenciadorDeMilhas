import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../_services/auth.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public router: Router,
              private toastr: ToastrService,
              public authService: AuthService) {
   }

  ngOnInit() {
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  entrar() {
    this.router.navigate(['/user/login']);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('timer');
    this.toastr.show('Log Out');
    this.router.navigate(['/user/login']);
  }

  userName() {
    //return sessionStorage.getItem('username');
    return localStorage.getItem('username');
  }

}
