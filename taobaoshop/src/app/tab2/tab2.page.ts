import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public config:any={};

  public selectedId;

  public lCateList:any[]= [];

  public rCateList:any[]= [];

  constructor(public navController:NavController,private common:CommonService) {

    this.config = this.common.config;
  }

  ngOnInit(){
    this.getLeftCateData();
  }

  goSearch(){
    this.navController.navigateForward('/search');
  }

  getLeftCateData(){
    var api="api/pcate";
    this.common.ajaxGet(api).then((response:any)=>{
      this.lCateList=response.result;
      this.getRightCateData(this.lCateList[0]._id);
    })

  }

  getRightCateData(pid){
    this.selectedId=pid;
    var api="api/pcate?pid="+pid;
    this.common.ajaxGet(api).then((response:any)=>{
      this.rCateList=response.result;
    })

  }
}
