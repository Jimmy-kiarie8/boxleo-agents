import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  centralUrl = environment.centralUrl + '/api/mobile';
  domain = environment.httpType;
  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      // Authorization: environment.token
      Authorization: 'Bearer ' + localStorage.getItem('token')
    })
  };
  constructor(private http: HttpClient) { }

  getItem(): Observable<any> {
    return this.http.get<any>(`${this.domain}/orders`, this.httpOptions);
  }

  postItem(data: any, model: String): Observable<any> {
    return this.http.post(`${this.domain}/${model}`, data, this.httpOptions);
  }

  patchItem(data: any,model: String, id: any): Observable<any> {
    return this.http.patch(`{this.domain}/${model}/${id}`, data, this.httpOptions);
  }

}
