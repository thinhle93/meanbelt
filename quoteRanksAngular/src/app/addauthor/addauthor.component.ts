import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router'
@Component({
  selector: 'app-addauthor',
  templateUrl: './addauthor.component.html',
  styleUrls: ['./addauthor.component.css']
})
export class AddauthorComponent implements OnInit {
  newAuthor: any;
  error: any;
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    
    this.newAuthor = {name: "", quote: []}
    
  }

  submitnew(){
    let newauthorob = this._httpService.addAuthor(this.newAuthor);
    newauthorob.subscribe(data => {
      console.log(data)
      if(data['message']=="Errors"){
        //console.log("===========")
        this.error = data['error']
        console.log("sdfsd", this.error)
      }
      else if(data['message']=="lt3"){
        this.error = data['error']['errors']['name']['message'];
        console.log(this.error)
        //console.log(data)
      }
      else{
        console.log("++++++++", data)
        console.log("successfully added new author")
        this._router.navigate(['/home'])
      }
      
      })
  }
}
