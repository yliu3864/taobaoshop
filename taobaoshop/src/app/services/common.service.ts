import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { reject } from 'q';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public config:any={

    domain:'http://jd.itying.com/'
  }

  constructor(private http:HttpClient) {

  }


  ajaxGet(url){

    var api=this.config.domain+url;

    return new Promise((resove,project)=>{
      this.http.get(api).subscribe((res)=>{

        resove(res);
      },(err)=>{

        reject(err);
      })
    })
  }
}
