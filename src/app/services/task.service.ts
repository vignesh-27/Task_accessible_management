import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { taskResponse } from '../interfaces/task';

@Injectable({ providedIn: 'root' })
export class TaskService {
  constructor(private http: HttpClient) {}

  getTask(): Observable<any> {
    return this.http.get('http://localhost:3000/api/findTask');
  }

  createTask(taskParam: any): Observable<taskResponse> {
    return this.http
      .post<taskResponse>('http://localhost:3000/api/createTask', taskParam)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  updateTask(taskParam: any): Observable<taskResponse> {
    return this.http
      .patch<taskResponse>('http://localhost:3000/api/updateTask', taskParam)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  deleteTask(taskId: any) {
    this.http
      .get('http://localhost:3000/api/deleteTask', taskId)
      .subscribe((respData) => {
        return respData;
      });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Server returned code: ${error.status}, error message: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
