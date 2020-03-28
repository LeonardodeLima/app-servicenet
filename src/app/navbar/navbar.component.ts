import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { DataSharingService } from '../_services/data-sharing';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isLogged:boolean = false;
  
  constructor(private dataSharingService: DataSharingService, private router: Router) { }

  ngOnInit() {
    this.dataSharingService.isUserLoggedIn.subscribe( value => {
      this.isLogged = value;
    });
  }

  logout(){
    this.isLogged =false;
    sessionStorage.removeItem("userLogged");
    this.router.navigate(['login']);
  }
}
