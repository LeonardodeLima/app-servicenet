import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 

import { ToastrModule } from 'ngx-toastr';
import { NgxMaskModule} from 'ngx-mask-2';
import { NgSelectModule } from '@ng-select/ng-select'
import { SocialLoginModule,  AuthServiceConfig, FacebookLoginProvider } from "angular-6-social-login";
import { AgmCoreModule } from '@agm/core';


import { HeaderInterceptor } from './_ interceptors/header.interceptor'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SingupComponent } from './singup/singup.component';
import { ListClientComponent } from './client/client/list-client/list-client.component';
import { AddClientComponent } from './client/client/add-client/add-client.component';
import { EditClientComponent } from './client/client/edit-client/edit-client.component';


export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("822986041532088")
        }
      ]
  );
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    SingupComponent,
    ListClientComponent,
    AddClientComponent,
    EditClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // HttpModule,
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(),
    NgSelectModule,
    SocialLoginModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC8gw9ADJhl7AtflVslkiMH62oCfxU4MVU'
    })
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    { provide: AuthServiceConfig,useFactory: getAuthServiceConfigs  },
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
