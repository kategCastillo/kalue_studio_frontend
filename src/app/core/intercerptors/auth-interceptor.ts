import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { HttpAuth } from '../services/http-auth';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const httpAuth = inject (HttpAuth);
  const token = httpAuth.token;
  const router = inject(Router);

  let requestHadersToken = req ;
  
  if (token){
    requestHadersToken = req.clone({
      headers: req.headers
      .set('X-Token', token)
    })
  
  }
  return next(requestHadersToken).pipe(
    catchError((error : HttpErrorResponse) => {
      if( error.status == 401 ) {
        httpAuth.clearAuthData();
        router.navigateByUrl( '/login' );
      }
      return throwError( () => error );
    } )
  );
};
