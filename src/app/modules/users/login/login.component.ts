import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  showLoginError = false;
  constructor(private fb:FormBuilder,public router:Router, public loginService: AuthService,public toastr:ToastrManager) { }
  isLogin= true;
  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email:['',Validators.required],
      username:['',Validators.required],
      password:['',Validators.required],
      confirm_password:['',Validators.required]
    })
    
  }


  login(username:string,password:string){
    this.showLoginError = false;
    let requestObj = {username:username,password:password}

    this.loginService.loginUser(requestObj).subscribe((data:any) => {
      if(data['status'] === 'success'){
        localStorage.setItem('username',requestObj.username)
        this.router.navigate(['/home'])
      this.toastr.successToastr('Logged in successfully!', 'Success',{toastTimeout:6000});
      } else {
        this.showLoginError = true;
        this.toastr.errorToastr('Please enter valid credentials.')
        // this.router.navigate(['/home'])
      }
      console.log(data);
    },
    (err: any)=>{
      this.toastr.errorToastr(err['error']['message'] ? err['error']['message'] : 'Please enter valid credentials!', 'Error',{toastTimeout:6000});
    // this.router.navigate(['/home'])
    });

}
loginGuest(): any{
  this.router.navigate(['blogs/home'])
}


registerUser(): any{
  {
    this.showLoginError = false;
    let requestObj = this.loginForm?.value;

    this.loginService.registerUser(requestObj).subscribe((data:any) => {
      if(data['status'] === 'success'){
      this.toastr.successToastr('User Registered successfully, you can login now!', 'Success',{toastTimeout:6000});
      this.loginForm.reset();
      this.router.navigate(['/login'])
      
    } else {
        this.showLoginError = true;
      }
      console.log(data);
    },
    (err: any)=>{
      this.toastr.errorToastr(err['error']['message'] ? err['error']['message'] : 'Something went wrong!', 'Error',{toastTimeout:6000});
    console.log(err['error']['message'])
    });

}


}

}
