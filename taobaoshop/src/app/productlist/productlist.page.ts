import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.page.html',
  styleUrls: ['./productlist.page.scss'],
})
export class ProductlistPage implements OnInit {

  productList:any[]=[];
  cid:Number;
  config:any={};
  page:any=1;

  constructor(private common:CommonService,private activateRoute:ActivatedRoute) {
    this.config=this.common.config;
   }

  ngOnInit() {
    this.activateRoute.queryParams.subscribe((data)=>{
      this.cid=data.cid;
      this.getProductList(null);
    })
  }

  getProductList(event){
    var api = 'api/plist?cid='+ this.cid+"&page="+this.page;
    this.common.ajaxGet(api).then((res:any)=>{
      console.log(res)
      this.productList=this.productList.concat(res.result);
      this.page++;
      event?event.target.complete():'';

      if(res.result.length<10){
        event?event.target.disable=true:'';
      }
    })
  }

  doSearch(){

  }


}
