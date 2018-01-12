import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
 import { AgmCoreModule } from 'angular2-google-maps/core';

import {EliteApi} from '../../shared/shared'

declare var window : any;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',

})
export class MapPage {

  map : any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private eliyteApi : EliteApi) {
      let games = this.navParams.data;
      let tournamentData = this.eliyteApi.getCurrentTournament();
      let location = tournamentData.locations[games.locationId];
      this.map = {
        lat : location.latitude,
        lng : location.longitude,
        zoom : 12,
        markerLabel : games.location
      };
  }

  ionViewLoaded() {


   
  }

  goDirections(){
    window.location = `geo:${this.map.lat},${this.map.lng};u=35;`;
  }

}
