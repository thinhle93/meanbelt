import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-editauthor',
  templateUrl: './editauthor.component.html',
  styleUrls: ['./editauthor.component.css']
})
export class EditauthorComponent implements OnInit {
  currentAuthorID: any;
  newAuthorName: any;
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.currentAuthorID = params['id'];
      //console.log(this.currentAuthorID)
     
    });
    this.newAuthorName = {name: ""};
  }


  editauthor(authorid){
    let author = this._httpService.updateAuthor(authorid, this.newAuthorName);
    author.subscribe(data => {
      console.log(data)
      if(data['message']==="Error"){
        console.log("theres an error", data)
      }
      else{
        console.log("successfully update author")
        this._router.navigate(['/home'])
      }
      
    })
  }
}
