import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Board} from '../model/board';
import {environment} from '../../environments/environment';
const API_URL = `${environment.apiURl}/board`;

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  constructor(private http: HttpClient) { }

  getBoardById(id: number): Observable<Board> {
    return this.http.get<Board>(API_URL + `/${id}`);
  }
}
