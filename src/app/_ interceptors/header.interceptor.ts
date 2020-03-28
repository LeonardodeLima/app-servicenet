import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let user = JSON.parse(sessionStorage.getItem("userLogged"));
    if (user) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + user.token
        }
      });
    }
    return next.handle(request);
  }
}