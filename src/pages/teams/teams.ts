import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import {TeamHomePage} from '../pages';
import {EliteApi} from '../../shared/shared';
import * as _ from 'lodash';

@IonicPage()
@Component({
  templateUrl: 'teams.html',
})
export class TeamsPage {

  private allTeams : any;
  private allTeamsDivisions : any;
  teams = [];
  queryText : string;
    constructor(public navCtrl: NavController, 
    private loadingController : LoadingController,
    public navParams: NavParams,
    private EliteApiService : EliteApi) {
  }

  ionViewDidLoad() {
    
   let selectedTurnament  = this.navParams.data;

   let loader = this.loadingController.create({
     content:'Getting data...'
   });

   loader.present().then(()=>{
    this.EliteApiService.getTournamentData(selectedTurnament.id).subscribe(data=>{
      this.allTeams = data.teams;
      this.allTeamsDivisions = 
          _.chain(data.teams)
           .groupBy('division')
           .toPairs()
           .map(item => 
             _.zipObject(['divisionName','divisionTeams'],item)
          )
           .value();
      
      this.teams  =this.allTeamsDivisions;
      console.log('division teams',this.teams);
      loader.dismiss();
     });
   });
}

  itemTapped($event,team){
    this.navCtrl.push(TeamHomePage,team);
  }


  updateTeams(){
    let queryTextLower = this.queryText.toLowerCase();
    let filteredTeams = [];
    _.forEach(this.allTeamsDivisions, td => {
      let teams = _.filter(td.divisionTeams, t => (<any>t).name.toLowerCase().includes(queryTextLower));
      if (teams.length) {
        filteredTeams.push({ divisionName: td.divisionName, divisionTeams: teams });
      }
    });
    this.teams = filteredTeams;
  }

}
