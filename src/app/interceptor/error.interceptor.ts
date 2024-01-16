import {inject, Injectable} from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router} from "@angular/router";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  intercept( req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let message: string = '';

        switch (error.status) {
          case 400:
            message = 'Title not found. Please try a different search term.';
            break;
         case 404:
            message = 'Book not found. Please check your request.';
            break;
         case 500:
            this.router.navigate(['/error']);
            break;
          default:
            message = 'Bad Request: An unknown error occurred.';
        }
        this.showSnackBarNotification(message);
        return throwError(() => error);
      })
    );
  }

  private showSnackBarNotification(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
    });
  }
}
