import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../services/common.service';
import { IonContent, AlertController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  @ViewChild(IonContent) content:IonContent;
  flag = true;
  productList = [];
  keywords;
  page = 1;
  config: any = {};
  hasInfinitData = true;
  subHeaderList:any[]=[];
  subHeaderSelected:any=1;
  sort;
  historyList=[];

  constructor(
    private common: CommonService,
    private storage: StorageService,
    private alertController: AlertController) {
    this.config = this.common.config;
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
    this.getHistory();
  }

  doSearch() {
    this.saveHistory();
    this.flag = false;
    this.hasInfinitData = true;
    this.page = 1;
    this.subHeaderSelected=1;
    this.content.scrollToTop(0);

    var api = 'api/plist?search=' + this.keywords + "&page=" + this.page;


    this.common.ajaxGet(api).then((res: any) => {

      this.productList = res.result;
      this.page++;

    })
  }

  getProductList(event){


    if(this.sort){
      var api = 'api/plist?cid='+ this.keywords+"&page="+this.page+'&sort='+this.sort;
    }else{
      var api = 'api/plist?search=' + this.keywords + "&page=" + this.page;
    }




    this.common.ajaxGet(api).then((res:any)=>{
      console.log(res)
      this.productList=this.productList.concat(res.result);
      this.page++;
      event?event.target.complete():'';

      if(res.result.length<10){
        this.hasInfinitData = false;
      }
    })
  }

  subHeaderChange(id){
    this.subHeaderSelected=id;



    this.sort=this.subHeaderList[id-1].fields+'_'+this.subHeaderList[id-1].sort;
    this.page=1;
    this.productList=[];
    this.hasInfinitData=true;
    this.subHeaderList[id-1].sort=this.subHeaderList[id-1].sort*-1;
    this.content.scrollToTop(0);

    this.getProductList(null);
  }

  saveHistory(){
    var list=this.storage.get('histroylist');
    if(list){
      if(list.indexOf(this.keywords)==-1){
        list.push(this.keywords);
      }
      this.storage.set('histroylist',list);
    }else{
      list=[]
      list.push(this.keywords);
      this.storage.set('histroylist',list);
    }

  }

  getHistory(){
    var list=this.storage.get('histroylist');
    this.historyList = list? list: null;
  }

  async removeHistory(key) {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: '提示!',
      message: '确定要删除吗？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }, {
          text: '确认',
          handler: () => {
            this.historyList.splice(key,1);
            this.storage.set('histroylist',this.historyList)
          }
        }
      ]
    });

    await alert.present();
  }

  goSearch(keywords){
    this.keywords=keywords;
    this.doSearch();
  }
}
