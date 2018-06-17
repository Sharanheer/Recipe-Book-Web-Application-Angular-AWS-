import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  //select:String = 'recipe';
  // option(feature:String){
  //   this.select = feature;
  // }

  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyDAIoWFtmnmxf4loTYXcf249OglLkor6yQ",
      authDomain: "ng-recipe-app-b9909.firebaseapp.com"
    });
  }
}


