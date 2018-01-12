import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {StandingsPage,TeamDetailPage} from '../pages'

@IonicPage()
@Component({
  selector: 'page-team-home',
  templateUrl: '../team-home/team-home.html',
})
export class TeamHomePage {

  team : any;
  teamDetailTab = TeamDetailPage;
  standingsTab = StandingsPage;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.team = this.navParams.data;
    console.log('team home : ' +this.team);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamHomePage');
  }

  goHome(){
    //this.navCtrl.push(MyTeamsPages);
    this.navCtrl.popToRoot()
  }

}
