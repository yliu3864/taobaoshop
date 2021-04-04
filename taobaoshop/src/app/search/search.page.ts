import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  flag=true;
  productList=[];

  constructor() {
    for(var i=1;i<=9;i++){
      this.productList.push({
        pic:'assets/0'+i+'.jpg',
        title:'第'+i+'个',
        price:i*22,
      })
    }
   }

  ngOnInit() {
  }

  doSearch(){
    this.flag = false;
  }
}
