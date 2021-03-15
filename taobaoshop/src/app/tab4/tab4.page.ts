import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor() { }

  ngOnInit() {
    setTimeout(function(){
       document.getElementById("1").style.visibility = "visible"; }, 1000);

    setTimeout(function(){
      document.getElementById("1").style.visibility = "hidden";
      document.getElementById("2").style.visibility = "visible";
    }, 2000);

    setTimeout(function(){
      document.getElementById("3").style.visibility = "visible";
      document.getElementById("1").style.visibility = "hidden";
      document.getElementById("2").style.visibility = "hidden";}, 3000);

    setTimeout(function(){
      document.getElementById("1").style.visibility = "visible";
      document.getElementById("2").style.visibility = "visible";
      document.getElementById("3").style.visibility = "visible";

     }, 4000);

  }

}
