import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  centralUrl = environment.centralUrl + '/api/mobile';
  httpType = environment.httpType;
  domain = localStorage.getItem('domain');
  httpOptions = {
    headers: new HttpHeaders({
      Accept:  'application/json',
      // Authorization: environment.token
      Authorization: 'Bearer ' + localStorage.getItem('token')
    })
  };
  constructor(private http: HttpClient) { }

  updateOrder(data: any, id: any): Observable<any> {
    return this.http.get<any>(`${this.httpType}${this.domain}.${this.centralUrl}/orders`, this.httpOptions);
  }
}
