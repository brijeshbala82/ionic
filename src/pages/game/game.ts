import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EliteApi} from '../../shared/shared'
import {TeamHomePage,MapPage} from "../../pages/pages";

declare var window : any;


@IonicPage()
@Component({
  
  templateUrl: '../game/game.html',
})
export class GamePage {

  game : any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
  private elitService : EliteApi) {
    this.game = this.navParams.data;
  }

  // ionViewLoaded() {
  //   this.game = this.navParams.data;
  // }
  ionViewDidLoad(){
    this.game = this.navParams.data;
    this.game.gameTime  =  Date.parse(this.game.time);
  }

  teamTapped(teamId){
    let tournamentData = this.elitService.getCurrentTournament();
    let team = tournamentData.teams.find(t=>t.id===teamId);
    this.navCtrl.push(TeamHomePage,team);
  }

  goToDirection(){
    this.game = this.navParams.data;
    let tournamentData = this.elitService.getCurrentTournament();
    let location = tournamentData.locations[this.game.locationId];
    window.location = `geo:${location.latitude},${location.longitude};u=35;`;
  }

  goToMap(){
    this.navCtrl.push(MapPage,this.game);
  }

  isWinner(score1,score2){
    return Number(score1)>Number(score2);
  }

}
