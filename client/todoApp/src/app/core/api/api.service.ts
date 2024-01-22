import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  /********** RESH URL ***************/
  url = environment.loginAdress;
  urlLoginAgent = environment.UrlLoginAgent;
  /*********EVALUATION URL FIN****************/

  constructor(public http: HttpClient) {}

  _get(endpoint: string, params?: any, reqOpts?: any): any {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams(),
      };
    }

    if (params) {
      reqOpts.params = params;
    }

    return this.http.get(this.url + '/' + endpoint, reqOpts);
  }

  _post(endpoint: string, body: any, reqOpts?: any): any {
    return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  }
  //Connexion
  _postLogin(endpoint: string, body: any, reqOpts?: any): any {
    return this.http.post(this.urlLoginAgent + '/' + endpoint, body, reqOpts);
  }

  _put(endpoint: string, body?: any, reqOpts?: any): any {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  _patch(endpoint: string, body: any, reqOpts?: any): any {
    return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
  }

  _delete(endpoint: string, body: any, reqOpts?: any): any {
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  execute(methode: string, data: any, reqOpts?: any): any {
    return this.http.post(this.url + '/' + methode, data, reqOpts);
  }
}
