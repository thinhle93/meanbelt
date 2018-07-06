import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-addquote',
  templateUrl: './addquote.component.html',
  styleUrls: ['./addquote.component.css']
})
export class AddquoteComponent implements OnInit {
  currentAuthorID: any;
  currentAuthorinfo: any;
  newQuote: any;
  error: any;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.currentAuthorID = params['id']
      //console.log(this.currentid)
    });
    this.findCurrentAuthor(this.currentAuthorID)
    this.newQuote = {content: ""};
  }
  findCurrentAuthor(id){
    let curAuthor = this._httpService.findAuthor(this.currentAuthorID);
    curAuthor.subscribe(data => {
      //console.log(data);
      this.currentAuthorinfo = data['name'];
      //console.log(this.currentAuthorinfo);
    })
  }

  //make the validation for submitting quotes
  submitQuote(){
    //console.log("pressed submit")
    //console.log(this.newQuote)
    let newQuote = this._httpService.addquote(this.currentAuthorID, this.newQuote);
    newQuote.subscribe(data => {
      console.log(data)
      if(data['message']==="Error"){
        console.log("theres an error", data)
        this.error = data['error'];
        console.log(this.error)
      }
      else{
        console.log("no errors", data)

        this._router.navigate(['/viewquotes/'+this.currentAuthorID])
      }
      
    })
  }
}
