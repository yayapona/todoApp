import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { httpOptions } from '../../utils/constante';

@Injectable({
  providedIn: 'root'
})
export class authService {
  constructor(
    private _http: HttpClient,
    private api: ApiService
  ){}

  login(data?: any): Observable<any> {
    return this.api._postLogin('api/v1/users/login', data, httpOptions)
  };

  signup(data?: any): Observable<any> {
    return this.api._postLogin('api/v1/users/signup', data, httpOptions)
  };

  logOut(data?: any): Observable<any> {
    return this.api._postLogin('evaluationagent/deconnexionagent', data, httpOptions)
  }

}
