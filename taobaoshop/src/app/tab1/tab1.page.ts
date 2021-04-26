import { Component, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonService } from '../services/common.service';

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

  constructor(public navController:NavController,private common:CommonService) {
  }


  ngOnInit():void{
    this.getFocusData();
    this.getHotData();
    this.getProductList();
  }

  slideEnd(){
    this.slide1.startAutoplay()
  }

  goSearch(){
    this.navController.navigateForward('/search');
  }

  getFocusData(){
    var api='api/focus';
    this.common.ajaxGet(api).then((res)=>{
      // console.log(res);
    })

    for(var i=1;i<=3;i++){

      this.slidesList.push({
        pic:'assets/slide0'+i+'.png',
        url:'',
      })
    }
  }

  getHotData(){
    for(var i=1;i<=9;i++){
      this.hotList.push({
        pic:'assets/0'+i+'.jpg',
        title:'第'+i+'个',
      })
    }

    this.hotListWidth = this.hotList.length*9+'rem';

  }

  getProductList(){

    for(var i=1;i<=12;i++){
      this.pList.push({
        pic:'assets/list'+i+'.jpg',
        title:'第'+i+'个',
      })
    }
  }
}
