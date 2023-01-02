import { Injectable} from '@angular/core';
import {
  HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private userService: UserService,
  ) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      console.error(err);
        if ([401, 403, 0].includes(err.status)) {
          this.userService.logout();
        }

        const error = err.error?.message || err.statusText;
        console.error(err);
        return throwError(() => error);
    }))
}
}


