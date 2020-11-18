import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation/ngx';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from './../services/auth.service';


declare var google;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit, OnDestroy {

  options: GeolocationOptions;
  currentPos: Geoposition;
  places: Array<any>;
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  place: any;
  private sub: any;

  constructor(
    private geolocation: Geolocation,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) {
      //user check
      if (!this.authService.checkUser()) this.router.navigate(['login'])
     }

    ngOnInit() {
      //Places
      this.sub = this.route.params.subscribe(params => {
        this.place = params['place']
      })
    }
    

  getUserPosition(){
    this.options = {
    enableHighAccuracy : false
    };
    this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {

        this.currentPos = pos;

        console.log(pos);
        this.addMap(pos.coords.latitude,pos.coords.longitude);

    },(err : PositionError)=>{
        console.log("error : " + err.message);
    ;
    })
  }

  addMap(lat,long){

    let latLng = new google.maps.LatLng(lat, long);

    let mapOptions = {
    center: latLng,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.getPlaces(latLng).then((results : Array<any>)=>{
        this.places = results;
        for(let i = 0 ;i < results.length ; i++)
        {          
            this.createMarker(results[i]);
        }
    },(status)=>console.log(status));

    this.addMarker();

  }

  addMarker(){

    let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: this.map.getCenter()
    });

    let content = "<p>Esta é sua posição atual !</p>";
    let infoWindow = new google.maps.InfoWindow({
    content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
    });

  }

  getPlaces(latLng)
  {
    var service = new google.maps.places.PlacesService(this.map);
    let request = {
        location : latLng,
        radius : 8047 ,
        types: [this.place]
    };
    return new Promise((resolve,reject)=>{
        service.nearbySearch(request,function(results,status){
            if(status === google.maps.places.PlacesServiceStatus.OK)
            {
                resolve(results);
            }else
            {
                reject(status);
            }

        });
    });

  }

  createMarker(place)
  {
    let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: place.geometry.location
    });
  }

  ionViewDidEnter(){
    this.getUserPosition();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
