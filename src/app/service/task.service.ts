import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Task} from '../model/task';
const API_URL = `${environment.apiURl}/tasks`;

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient) {}

  sortTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(API_URL + `/${id}`, task);
  }

  addNew(task: Task): Observable<Task> {
    return this.http.post<Task>(API_URL, task);
  }

  findById(id: number): Observable<Task> {
    return this.http.get<Task>(API_URL + `/${id}`);
  }

  editTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(API_URL + `/${id}`, task);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete<any>(API_URL + `/${id}`);
  }
}
