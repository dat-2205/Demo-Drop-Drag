import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Status} from '../model/status';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
const API_URL = `${environment.apiURl}/status`;

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http: HttpClient) { }

  editStatus(id: number, status: Status): Observable<Status> {
    return this.http.put<Status>(API_URL + `/${id}`, status);
  }

  addNewStatus(status: Status): Observable<Status> {
    return this.http.post(API_URL, status);
  }

  deleteStatus(id: number): Observable<any> {
    return this.http.delete<any>(API_URL + `/${id}`);
  }

}
