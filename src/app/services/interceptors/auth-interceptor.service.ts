/* eslint-disable @typescript-eslint/naming-convention */
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';


import { Observable, throwError } from 'rxjs';
import { catchError, first, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AUTH_TOKEN_KEY } from 'src/app/shared/static/storage.static';
import { StorageService } from '../storage-service/storage.service';





@Injectable({
    providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
    constructor(
        private readonly storageService: StorageService,
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('interceptor 1');
        const authToken$ = of(this.storageService.get(AUTH_TOKEN_KEY));

        return authToken$.pipe(
            first(),
            map(token => (token ? req.clone({ setHeaders: { authorization: `${token}` } }) : req)),
            switchMap(request =>
                next.handle(request).pipe(
                    catchError(err => {
                        console.log('Error? Here', err);
                        return throwError(() => err);
                    })
                )
            )
        );
    }
}
