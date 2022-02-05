import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(public _http: HttpClient) { }


  getBlogListData(): Observable<any> {
    return this._http.get('http://localhost:3000/bloglist',this.httpOptions);
  }

  getBlogDetailsData(id: number): Observable<any> {
    return this._http.get(`http://localhost:3000/blogdetail/${id}`,this.httpOptions);
  }

  addComment(requestObj: any): Observable <any>{
    return this._http.put('http://localhost:3000/add/comment', requestObj,this.httpOptions);
  }

}
