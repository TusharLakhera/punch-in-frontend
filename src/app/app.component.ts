import { Component } from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {angularMath} from 'angular-ts-math';
@Component({ 
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  currentDistance:boolean=false;
  hydLat=17.4238374/57.2957951;
  hydlong= 78.3475493999999/572977951;
  source=interval(10000);
  title = 'GeolocationAttendance';
  
  subscription: Subscription;
  
  // this.subscription=source.subscribe(val=>this.getLocation());
  getLocation(){
  // this.currentDistance=true;
    //console.log("in funct");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
    console.log(position.coords)
    let currLat=position.coords.latitude/57.2977951;
    let currLong=position.coords.longitude/57.2977951;
    let dLat=currLat-this.hydLat;
    let dLong=currLong-this.hydlong;
    let ans=angularMath.powerOfNumber(angularMath.sinNumber(dLat/2),2)+angularMath.cosNumber(this.hydLat)*angularMath.cosNumber(currLat)*angularMath.powerOfNumber(angularMath.sinNumber(dLong/2),2)
    ans=2* angularMath.asinNumber(angularMath.powerOfNumber(ans,0.5));
    ans=ans*6371/1000;
    if(ans<50){
      this.currentDistance=true;
    }
  });
  } else {
    alert("Geolocation is not supported by this browser.");
    return;
  }
}
ngOnInit()
        {
            this.getLocation();
            setInterval(() => {
                this.getLocation(); 
                }, 10000);
        }
}
