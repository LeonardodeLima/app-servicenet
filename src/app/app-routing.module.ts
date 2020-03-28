import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// import components
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SingupComponent } from './singup/singup.component';

import { ListClientComponent } from './client/client/list-client/list-client.component';
import { AddClientComponent } from './client/client/add-client/add-client.component';
import { EditClientComponent } from './client/client/edit-client/edit-client.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'login', component: LoginComponent},
  {path:'singup', component: SingupComponent},
  {path:'edit-client', component: EditClientComponent},
  {path:'list-client', component: ListClientComponent},
  {path:'add-client', component: AddClientComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
