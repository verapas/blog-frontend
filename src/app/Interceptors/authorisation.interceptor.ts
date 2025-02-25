import {HttpInterceptorFn} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {inject} from '@angular/core';

export const authorizationInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  const token = cookieService.get('JOURNALIX_ACCESS_TOKEN');

  const clonedRequest = token
    ? req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    })
    : req;

  return next(clonedRequest);
};
