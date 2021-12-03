import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Label} from '../model/label';
import {environment} from '../../environments/environment';
const API_URL = `${environment.apiURl}/labels`;

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  constructor(private http: HttpClient, ) {}

  getAllLabelByBoardId(id: number): Observable<Label[]> {
      return this.http.get<Label[]>(API_URL + `/${id}`);
  }

  addNewLabel(label: Label): Observable<Label> {
    return this.http.post<Label>(API_URL, label);
  }

  deleteLabel(id: number): Observable<any> {
    return this.http.delete<any>(API_URL + `/${id}`);
  }

  editLabel(id: number, label: Label): Observable<Label> {
    return this.http.put<Label>(API_URL + `/${id}`, label);
  }
}
