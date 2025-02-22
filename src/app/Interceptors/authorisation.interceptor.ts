import {HttpInterceptorFn} from '@angular/common/http';

export const authorizationInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('ACCESS_TOKEN');

  // Falls ein Token existiert, klone den Request und setze den Authorization-Header
  const clonedRequest = token
    ? req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    })
    : req;

  return next(clonedRequest);
};

