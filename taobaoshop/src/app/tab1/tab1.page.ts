import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  @ViewChild('slide1') slide1;

  public slidesOpts={
    speed : 400,
    autoplay:{
      delay: 2000,
    },
    loop: true
  }
  public slidesList:any[]=[];

  public hotList:any[]=[];

  public hotListWidth:any = 400;

  public pList:any[]= [];

  constructor() {

    for(var i=1;i<=3;i++){

      this.slidesList.push({
        pic:'assets/slide0'+i+'.png',
        url:'',
      })
    }

    for(var i=1;i<=9;i++){
      this.hotList.push({
        pic:'assets/0'+i+'.jpg',
        title:'第'+i+'个',
      })
    }

    this.hotListWidth = this.hotList.length*9+'rem';

    for(var i=1;i<=12;i++){
      this.pList.push({
        pic:'assets/list'+i+'.jpg',
        title:'第'+i+'个',
      })
    }
  }
  slideEnd(){
    this.slide1.startAutoplay()
  }
}
