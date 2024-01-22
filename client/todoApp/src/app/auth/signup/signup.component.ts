import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {signupModel} from "../../model/signupModel";
import { authService} from "../../core/service/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm!:FormGroup;
  signupModel = new signupModel()
   constructor(
     private _fb: FormBuilder,
     private authService: authService,
     private router: Router
   ) {
    this.signupForm = this._fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    })
   };

  signup(){
    console.log(signupModel)
    this.signupModel.name = this.signupForm.get('name')?.value;
    this.signupModel.email = this.signupForm.get('email')?.value;
    this.signupModel.password = this.signupForm.get('password')?.value;
    this.signupModel.passwordConfirm = this.signupForm.get('passwordConfirm')?.value;
    this.authService.signup(this.signupModel).subscribe(res => {
       if(res.code === 200){
         this.router.navigate(['/home/task']);
       }
    })


  }
}
