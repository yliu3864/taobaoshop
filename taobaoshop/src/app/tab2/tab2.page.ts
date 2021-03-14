import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public lCateList:any[]= [];

  public rCateList:any[]= [];

  constructor() {

    for(var i=1;i<=20;i++){
      this.lCateList.push(`分类${i}`)
    }

    for(var i=1;i<=12;i++){
      this.rCateList.push({
        pic:'assets/list'+i+'.jpg',
        title:'第'+i+'个',
      })
    }
  }

}
