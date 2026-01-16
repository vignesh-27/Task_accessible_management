import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { taskResponse } from '../interfaces/task';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TaskService {
  constructor(private http: HttpClient) {}

  getTask(): Observable<any> {
    const url = `${environment.server_url}/findTask`;
    return this.http.get(url).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  createTask(taskParam: any): Observable<taskResponse> {
    const url = `${environment.server_url}/createTask`;
    return this.http.post<taskResponse>(url, taskParam).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  updateTask(taskParam: any): Observable<taskResponse> {
    const url = `${environment.server_url}/updateTask`;
    return this.http.patch<taskResponse>(url, taskParam).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  deleteTask(taskId: any): Observable<any> {
    const url = `${environment.server_url}/deleteTask`;
    return this.http.post(url, taskId).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
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
