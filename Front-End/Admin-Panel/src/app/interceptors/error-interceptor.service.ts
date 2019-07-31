import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private toastr: ToastrService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(evt => {
        if (evt instanceof HttpResponse) {
          if (evt.body && evt.body.success)
            this.toastr.success(evt.body.success.message, evt.body.success.title, { positionClass: 'toast-bottom-center' });
        }
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          try {
            this.toastr.error(err.error.message, err.error.title, { positionClass: 'toast-top-right' });
          } catch (e) {
            this.toastr.error('An error occurred', '', { positionClass: 'toast-top-right' });
          }
          //log error 
        }
        return of(err);
      }));


  }


}
