import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http'

import { AgmCoreModule } from 'angular2-google-maps/core'

import { MyApp } from './app.component';
import { MyTeamsPages } from '../pages/pages';
//   TournamentsPage,
//   TeamsPage,
//   TeamDetailPage,
//   TeamHomePage,
//   StandingsPage,MapPage } 


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { EliteApi, UserSetting } from '../shared/shared';
import { IonicStorageModule } from '@ionic/storage';
import { GamePageModule } from '../pages/game/game.module';
import { MapPageModule } from '../pages/map/map.module';
import { StandingsPageModule } from '../pages/standings/standings.module';
import { TeamDetailPageModule } from '../pages/team-detail/team-detail.module';
import { TeamHomePageModule } from '../pages/team-home/team-home.module';
import { TeamsPageModule } from '../pages/teams/teams.module';
import { TournamentsPageModule } from '../pages/tournaments/tournaments.module';


import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';





@NgModule({
  //schemas:  [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    MyApp,
    MyTeamsPages,
    HomePage, ListPage
    // TournamentsPage,
    //TeamsPage,
    // TeamDetailPage,
    //  TeamHomePage,
    // StandingsPage,
    //GamePage,
    //MapPage
  ],
  imports: [
    BrowserModule,
    GamePageModule,
    MapPageModule,
    StandingsPageModule,
    TeamDetailPageModule,
    TeamHomePageModule,
    TeamsPageModule,
    TournamentsPageModule,

    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyBbsOlMryAHu2ESwHHSwrDBIUU7fiENNoM' })

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyTeamsPages,
    HomePage, ListPage
    // TournamentsPage,
    // TeamsPage,
    //TeamDetailPage,
    // TeamHomePage,
    // StandingsPage,
    //GamePage,
    //MapPage

  ],
  providers: [
    EliteApi,


    UserSetting,

    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
