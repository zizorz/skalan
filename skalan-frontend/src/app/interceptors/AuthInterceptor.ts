import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userAuth = localStorage.getItem('user');
    if (userAuth) {
      request = request.clone({
        setHeaders: {
          Authorization: `Basic ${userAuth}`
        }
      });
    }
    return next.handle(request);
  }
}
