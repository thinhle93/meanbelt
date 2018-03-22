import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-viewquotes',
  templateUrl: './viewquotes.component.html',
  styleUrls: ['./viewquotes.component.css']
})
export class ViewquotesComponent implements OnInit {
  currentAuthorQuotes: any;
  currentid: any;
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.currentid = params['id']
      //console.log(this.currentid)
    });
    this.findCurrentAuthor(this.currentid);
  }

  findCurrentAuthor(id){
    let curAuthor = this._httpService.findAuthor(this.currentid);
    curAuthor.subscribe(data => {
      //console.log(data);
      this.currentAuthorQuotes = data['quote'];
      //console.log(this.currentAuthorQuotes);
    })
  }

addnewquote(id){
  //console.log(id);
  this._router.navigate(['/addquote/'+id])
}

  delid(id){
   // console.log(id);
    let curQuote = this._httpService.delquote(this.currentid, id);
    curQuote.subscribe(data => {
      console.log("deleting------")
      this.findCurrentAuthor(this.currentid)
    })
  }

votequote(quoteid, num){
  let vote = this._httpService.quoteVote(this.currentid, quoteid, num);
  vote.subscribe(data => {
    console.log(data)
    this.findCurrentAuthor(this.currentid);
  })
}

}
