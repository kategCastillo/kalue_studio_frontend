import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HttpAuth } from '../services/http-auth';
import { map, tap } from 'rxjs';

export const guestGuard: CanActivateFn = (route, state) => {
  const httpAuth = inject(HttpAuth);
  const router = inject(Router);

  return httpAuth.checkAuthStatus().pipe(
    map( (isAuthenticated) =>  !isAuthenticated  ),
    tap( (isGuest) => {
      if( !isGuest ){
        router.navigateByUrl('/dashboard/resume')
      }
    } )
  )
};
