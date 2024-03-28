import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from '../services/authentication-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css']
})
export class AdminTemplateComponent implements OnInit {
  constructor(public authService:AuthenticationServiceService ,private router:Router){

  }
  ngOnInit(): void {
  
  }
  handlelogout(){
    this.authService.logout().subscribe({
      next :(data )=>{
        this.router.navigateByUrl('/login');

      }
    })

  }

}
