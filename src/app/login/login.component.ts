import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angular-6-social-login';
import { DataSharingService }  from '../_services/data-sharing';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{

  
  public loginForm: FormGroup;
  public submitted:boolean = false;
  public recoverform:boolean = false;
  public loading:boolean = false;
  public currentUrl:string[];
  public errorLogin:string = '';
  

  constructor( private dataSharingService: DataSharingService, private socialAuthService: AuthService,  private formBuilder: FormBuilder,  private userService: UserService,  private router: Router) {
    
    if(this.userService.getFullUser()) {
      this.dataSharingService.isUserLoggedIn.next(true)
      this.router.navigate(['list-client']) 
      return;
    }else{
      this.router.navigate(['login']) 
    }

  }

  ngOnInit(): void{
    this.loginForm = this.formBuilder.group({
      email: ['',[Validators.required,  Validators.email]],
      password: ['', Validators.required]
    });  
    
  }

  onSubmitLogin(event: Event){
    
    event.preventDefault();
    this.submitted = true;
    this.loading = true;
    this.errorLogin ='';

    if(this.loginForm.status == "INVALID"){
      this.loading = false;
      return;
    } 
      this.userService.login(this.f.email.value , this.f.password.value, () => {
            
          this.dataSharingService.isUserLoggedIn.next(true);  
          this.router.navigate(['list-client']) 
          this.loading = false;

        }, (error: { message: string; }) => {
          this.errorLogin = error.message;
          this.loading = false;
          this.submitted = false;

        });
    
  }

  get f() { return this.loginForm.controls; }

  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider: string;
    
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
   
    this.socialAuthService.signIn(socialPlatformProvider).then((userData) => {

      let userMail = userData.email;
      if(userData.email == undefined) userMail =  userData.id;
      console.log(userMail, userData)
      console.log("user data", userData);

      this.userService.login(userMail , userData.id+userData.email, () => { 
        this.loading = false;
        this.router.navigate(['list-client']) 
      }, (error: { message: string; }) => {
        this.errorLogin = error.message;
        this.loading = false;
        this.submitted = false;
  
      });

    });
  }

}
