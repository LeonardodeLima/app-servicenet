import { Injectable } from '@angular/core';
import { API_URL } from '../configs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private router_login = 'user/login';
    private router_register = 'user/create';

    
    constructor(private httpClient: HttpClient) { }


    login(email:string, password:string, successCallback: Function, errorCallback: Function){
        this.loginService(email, password).then(data => {
            // if(!data.token){
            //     errorCallback(data);
            // }else{
                sessionStorage.setItem("userLogged", JSON.stringify(data) );
                successCallback();
            // }  
        }, error => {
            errorCallback(error);
        });

    }
    
    loginService(email:string, password:string) {

        return this.httpClient.post(API_URL+this.router_login, { "email":email,  "password":password }).toPromise();
    }

    register(email:string, password: string, name:string){
        return this.httpClient.post(API_URL+this.router_register, { "email":email,  "password":password, "name":name }).toPromise();
    }

    getFullUser() {
        try {
            return JSON.parse(sessionStorage.getItem("userLogged"));
        } catch {
            return false;
        }
    }


}
