import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class TaskService {

  constructor(private http: HttpClient){}

  getTask(): Observable<any>{
   return this.http.get('http://localhost:3000/api/findTask');
}

  createTask(taskParam: any){
  this.http.post('http://localhost:3000/createTask', taskParam).subscribe((respData) => {
    return respData;
  });
}

  updateTask(taskParam: any){
  this.http.patch('http://localhost:3000/updateTask', taskParam).subscribe((respData) => {
    return respData;
  });
}

  deleteTask(taskId: any){
  this.http.get('http://localhost:3000/deleteTask', taskId).subscribe((respData) => {
    return respData;
  });
}

}