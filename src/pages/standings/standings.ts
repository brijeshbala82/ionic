import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EliteApi} from '../../shared/shared';
import * as _ from  'lodash';

@IonicPage()
@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html',
})
export class StandingsPage {
  standings : any[];
  team : any;
  allStandings : any[];
  divisionFilter : string = 'division';
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private eliteService : EliteApi) {
  }

  ionViewDidLoad() {
    this.team = this.navParams.data;
    let tournamentData = this.eliteService.getCurrentTournament();
    this.standings = tournamentData.standings;

    // this.allStandings = 
    // _.chain(this.standings)
    // .groupBy('division')
    // .toPairs()
    // .map(item => _.zipObject(['divisionName','divisionStandings'],item))
    // .value();

    console.log('standings : ' , this.standings);
//console.log('All standings : ' ,  this.allStandings);
    this.allStandings = tournamentData.standings;

    this.filterDivision();
  }

  filterDivision(){
    if(this.divisionFilter === 'all'){
      this.standings = this.allStandings;
    }
    else{
      this.standings = _.filter(this.allStandings,s=> s.division === this.team.division)
    }
  }

  getHeader(record,recordIndex,records){
    if(recordIndex% 10 === 0 || record.division !== records[recordIndex-1].division){
      return record.division;
    }
    else{
      return null;
    }

  }

}
