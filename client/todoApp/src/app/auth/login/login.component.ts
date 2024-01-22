import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router} from "@angular/router";
import { authService } from '../../core/service/auth.service';
import { loginModel} from "../../model/loginModel";
import {take} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  loginModel = new loginModel();
  dataLogin: any
   ngOnInit() {

   }

  constructor(
    private _fb: FormBuilder,
    private authService: authService,
    private router: Router,

  ) {
    this.loginForm = _fb.group({
      email: ['', Validators.required],
      password: ['',Validators.required]
    })
  };
  login(){
    this.loginModel.email = this.loginForm.get('email')?.value;
    this.loginModel.password = this.loginForm.get('password')?.value;
    this.authService.login(this.loginModel)
      .pipe(take(1))
      .subscribe( res => {
      if(res.code === 200){
        this.router.navigate(['/home/task'])
      }else {
      }
    })


  };




}
