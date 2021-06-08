import { Component, OnInit,ViewChild } from '@angular/core';
import { CommonService } from '../services/common.service';
import { ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular';


@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.page.html',
  styleUrls: ['./productlist.page.scss'],
})
export class ProductlistPage implements OnInit {

  @ViewChild(IonContent) content:IonContent;

  productList:any[]=[];
  cid:Number;
  config:any={};
  page:any=1;
  subHeaderList:any[]=[];
  subHeaderSelected:any=1;
  sort;
  hasInfinitData = true;

  constructor(private common:CommonService,private activateRoute:ActivatedRoute) {
    this.config=this.common.config;
    this.subHeaderList=[
      {
        id:1,
        title:"综合",
        fields:"all",
        sort:-1
      },
      {
        id:2,
        title:"销量",
        fields:"salecount",
        sort:-1
      },
      {
        id:3,
        title:"价格",
        fields:"price",
        sort:-1
      },
    ]
   }

  ngOnInit() {
    this.activateRoute.queryParams.subscribe((data)=>{
      this.cid=data.cid;
      this.getProductList(null);
    })
  }

  getProductList(event){
    if(this.sort){
      var api = 'api/plist?cid='+ this.cid+"&page="+this.page+'&sort='+this.sort;
    }else{
      var api = 'api/plist?cid='+ this.cid+"&page="+this.page;
    }

    this.common.ajaxGet(api).then((res:any)=>{
      console.log(res)
      this.productList=this.productList.concat(res.result);
      this.page++;
      event?event.target.complete():'';

      if(res.result.length<10){
        // event?event.target.disable=true:'';
        this.hasInfinitData = false;
      }
    })
  }

  doSearch(){

  }

  subHeaderChange(id){
    this.subHeaderSelected=id;
    this.sort=this.subHeaderList[id-1].fields+'_'+this.subHeaderList[id-1].sort;
    this.page=1;
    this.hasInfinitData = true;
    this.productList=[];
    this.subHeaderList[id-1].sort=this.subHeaderList[id-1].sort*-1;
    this.content.scrollToTop(0);

    this.getProductList(null);
  }


}
