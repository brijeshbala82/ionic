import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';

import {TeamsPage} from '../pages';
import {EliteApi} from '../../shared/shared';


@IonicPage()
@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {

  tournaments : any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private eliteService : EliteApi,
    private loadingController : LoadingController) {

  }


  ionViewDidLoad() {
    let loader = this.loadingController.create({
      content : "Getting tournaments...",
      //spinner : 'dots'
    })
    loader.present().then(()=>{
      this.eliteService.getTournaments().then(data => this.tournaments = data);
      loader.dismiss()
    });
    
  }

  itemTapped($event,tournament) {
    this.navCtrl.push(TeamsPage,tournament);
  }

}
