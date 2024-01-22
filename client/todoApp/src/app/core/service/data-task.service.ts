import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { httpOptions } from '../../utils/constante';

@Injectable({
  providedIn: 'root'
})
export class DataTaskService {

  constructor(
    private _http: HttpClient,
    private api: ApiService
  ){};

  AddTask(data?: any): Observable<any>{
    return this.api._post('evaluationagent/addAgent',data, httpOptions)
  };

  getAllTask(data?: any): Observable<any>{
    return this.api._get('api/v1/tasks/task',data, httpOptions)
  };

  updateTask(data?: any): Observable<any>{
    return this.api._put('evaluationagent/updateAgent', data, httpOptions)
  };

  deleteTask(data?: any): Observable<any>{
    return this.api._post('evaluationagent/deleteById' , data, httpOptions)
  }
}
