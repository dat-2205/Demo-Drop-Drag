import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Color} from '../model/color';
import {environment} from '../../environments/environment';
const API_URL = `${environment.apiURl}/colors`;

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Color[]> {
    return this.http.get<Color[]>(API_URL);
  }
}
