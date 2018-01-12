import { Component, ViewChild } from '@angular/core';

import { Events, LoadingController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyTeamsPages, TournamentsPage, TeamHomePage } from '../pages/pages';
import { EliteApi, UserSetting } from '../shared/shared';

// import * as _ from 'lodash';




@Component({
  templateUrl: 'app.html',

})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MyTeamsPages;

  pages: Array<{ title: string, component: any }>;
  favoriteTeams = [];
  constructor(private userSetting: UserSetting,
    public platform: Platform,
    private events: Events,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen, private loadingController: LoadingController, private eliteApi: EliteApi) {
    this.initializeApp();



  }

  GoToTeam(fev) {
    let loader = this.loadingController.create({
      content: 'Getting data...',
      dismissOnPageChange: true
    });
    loader.present();
    this.eliteApi.getTournamentData(fev.TournamentId).
      subscribe(l => this.nav.push(TeamHomePage, fev.team));
  }

  refreshFaverites() {
    var that = this;
    this.userSetting.getAllFavorites().then(function (result) {
      that.favoriteTeams = result;

    //   that.favoriteTeams = _.map(result, function(value, index) {
    //     return [value];
    // });
    });
}

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.refreshFaverites();
      this.events.subscribe('favoriteTeams:changed', () => {
        this.refreshFaverites()
        console.log();
      });
    
  });
}

goHome(){
  this.nav.push(MyTeamsPages)
}

goTournament(){
  this.nav.push(TournamentsPage);
}
}
