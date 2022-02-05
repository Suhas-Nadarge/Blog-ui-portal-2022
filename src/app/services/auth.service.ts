import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(public _http: HttpClient) { }

  registerUser(requestObj: any): any{
    return this._http.post('localhost:3000/register', requestObj,this.httpOptions);
  }

  loginUser(requestObj: any): any{
    return this._http.post('localhost:3000/login', requestObj,this.httpOptions);
  }

}
