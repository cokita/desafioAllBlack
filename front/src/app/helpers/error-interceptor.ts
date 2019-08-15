import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private _router: Router, public snackBar: MatSnackBar) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): any {
        return next.handle(request).pipe(catchError(err => {

            this.snackBar.open(err.error.message, null, {
                duration: 2000,
                verticalPosition: 'bottom',
                horizontalPosition:'right'
            });
            if (err.status === 401) {
                if(this._router.url.indexOf('/') === -1) {
                    // auto logout if 401 response returned from api
                    // this.loginService.logout();
                    location.reload(true);
                }
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}
