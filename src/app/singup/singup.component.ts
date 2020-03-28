import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser } from 'angular-6-social-login';
import { DataSharingService }  from '../_services/data-sharing';
import { UserService} from '../_services/user.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})

export class SingupComponent implements OnInit{

  
  public loginForm: FormGroup;
  public submitted:boolean = false;
  public recoverform:boolean = false;
  public loading:boolean = false;
  public currentUrl:string[];
  public errorLogin:string = '';

  
  
  constructor(private dataSharingService:DataSharingService, private socialAuthService: AuthService,  private formBuilder: FormBuilder,  private userService: UserService,  private router: Router, private cRef: ChangeDetectorRef ) {
    
    if(this.userService.getFullUser()) {
      this.router.navigate(['/login']) 
      return;
    }

  }

  ngOnInit(): void{
    this.currentUrl = this.router.url.split("/"); 
    this.loginForm = this.formBuilder.group({
      email: ['',[Validators.required,  Validators.email]],
      password: ['', Validators.required],
      name: ['', Validators.required]
    });  
  }

  onSubmitLogin(event: Event){
    
    event.preventDefault();
    this.submitted = true;
    this.loading = true;
    this.errorLogin ='';

    if(this.loginForm.status == "INVALID"){
      this.loading = false;
      this.errorLogin = "Verifique o formulário e preencha corretamente."
      this.resetErro();
      return;
    } 

      this.userService.register(this.f.email.value , this.f.password.value, this.f.name.value).then( result => {
          this.afterRegister(this.f.email.value , this.f.password.value);
        }, error => {
          this.errorLogin = error.error.message;
          this.loading = false;
          this.submitted = false;
          this.resetErro();
        });
    
  }

  afterRegister(email:string, password:string ){
    this.userService.login(email , password, () => { 
      this.cRef.detectChanges();
      this.loading = false;
      this.dataSharingService.isUserLoggedIn.next(true);  
      this.router.navigate(['/list-client']) 
    }, error => {
      this.errorLogin = error.message;
      this.loading = false;
      this.submitted = false;
      this.resetErro();
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
      this.userService.register(userMail,  userData.id+userData.email, userData.name).then( result => {
        this.afterRegister(userMail , userData.token);
        }, error => {
          this.errorLogin = error.error.message;
          this.loading = false;
          this.submitted = false;
        });
    });
  }

  resetErro(){
    setTimeout(() => {
      this.errorLogin = '';
    }, 3000);
  }
}
