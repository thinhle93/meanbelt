import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  getallauthors(){
    return this._http.get('/quotes')
  }
  findAuthor(id){
    return this._http.get('/quotes/'+id)
  }

  addAuthor(newAuthor){
    
    return this._http.post('/quotes', newAuthor)
  }
  delquote(authorid, quoteid){
    return this._http.post('/quotes/delete/'+quoteid, {ATID: authorid})
  }
  addquote(AuthorID, newquote){
    return this._http.post('/quotes/newquote/' + AuthorID, newquote)
  }
  quoteVote(authorid, quoteid, num){
    console.log(num)
    console.log(quoteid)
    return this._http.post('/quotes/vote/'+ authorid, {qid: quoteid, votenum: num})
  }

  updateAuthor(ATID, newATname){
    return this._http.put('/quotes/editauthor/'+ ATID, {new: newATname});
  }
}
