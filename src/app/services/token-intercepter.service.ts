import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { StoreInfoService } from './store-info.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { switchMap, filter, take, catchError } from 'rxjs/operators';
import { Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenIntercepterService {
  constructor(
    private storeInfo : StoreInfoService,
    private router : Router,
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.storeInfo.accessToken;
    return next.handle(this.addAuthorizationHeader(req, accessToken)).pipe(
                catchError(err => {
                if (err instanceof HttpErrorResponse && err.status === 401) {
                  return this.logoutAndRedirect(err);
                }
                else if (err instanceof HttpErrorResponse && err.status === 403) {
                  return this.logoutAndRedirect(err);
                }
                return throwError(err);
              })
          );
  }

  addAuthorizationHeader(request: HttpRequest<any>, token): HttpRequest<any> {
    if (token != null && token != 'undefined') {
      return request.clone({setHeaders: {Authorization: `Bearer ${token}`}});
    } 
    return request;
  }

  logoutAndRedirect(err): Observable<HttpEvent<any>> {
    this.storeInfo.signOut();
    this.router.navigateByUrl('/login');
    return throwError(err);
  }
}
