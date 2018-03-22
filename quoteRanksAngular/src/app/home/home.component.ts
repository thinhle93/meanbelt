import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allAuthors: any;
  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.getauthors();
  }

  getauthors(){
    let observe = this._httpService.getallauthors();
    observe.subscribe(data => {
      console.log(data);
      this.allAuthors = data;
    })
  }

  viewQuotes(id){
      this._router.navigate(['/viewquotes/'+id])
    
  }
}
