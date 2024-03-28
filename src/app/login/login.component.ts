import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationServiceService } from '../services/authentication-service.service';
import { AppUser } from '../model/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userFormGroup!: FormGroup;
  errorMessage!: any;
  constructor(private fb: FormBuilder, private router: Router, private authServ: AuthenticationServiceService) {

  }
  ngOnInit(): void {
    this.userFormGroup = this.fb.group({
      username: this.fb.control(""),
      password: this.fb.control("")
    })
  }
  handeleLogin() {
    let username = this.userFormGroup.value.username;
    let password = this.userFormGroup.value.password;
    this.authServ.login(username, password).subscribe({
      next: (appUser: AppUser) => {
        this.authServ.authenticateUser(appUser).subscribe({
          next: (data) => {
            this.router.navigateByUrl("/admin");
          }
        })
      }, error: (err) => {
        this.errorMessage = err;
      }
    })

  }
}
