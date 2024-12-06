import Swal from 'sweetalert2';

import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const HeadersInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  let auth = new AuthService(); //crear instancia de Auth

  if (AuthService.loadingHeader) {
    //Cargando swal en el interceptor
    Swal.fire({
      title: 'Espere por favor...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(null);
      },
      willClose: () => {
        Swal.close();
      },
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Si el token ha expirado, cerrar la sesión
      if (error.status === 401) {
        auth.logout(); //cerrar sesión
      }
      return throwError(() => error);
    }),
    finalize(() => {
      if (AuthService.loadingHeader) {
        Swal.close(); //cerrar el loading
      }
    })
  );
};
