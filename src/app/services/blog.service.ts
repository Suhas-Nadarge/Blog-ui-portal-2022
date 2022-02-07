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
    return this._http.get('http://localhost:9000/posts',this.httpOptions);
  }

  getBlogDetailsData(id: number): Observable<any> {
    return this._http.get(`http://localhost:9000/posts/${id}`,this.httpOptions);
  }

  addComment(requestObj: any): Observable <any>{
    return this._http.put(`http://localhost:9000/posts/${requestObj.id}/comments`, requestObj,this.httpOptions);
  }

  editComment(requestObj: any): Observable <any>{
    return this._http.put(`http://localhost:9000/comments/${requestObj.id}`, requestObj,this.httpOptions);
  }

  getAllComments(id: any): Observable<any> {
    return this._http.get(`http://localhost:9000/posts/${id}/comments`,this.httpOptions);
  }


  // POST /posts/{id}/comments Add comment to single blog post
  // PUT /comments/{id} Update single comment
}
