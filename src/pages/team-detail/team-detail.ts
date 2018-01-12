import { Component } from '@angular/core';
import { AlertController,ToastController, IonicPage,  NavController,
   NavParams, LoadingController } from 'ionic-angular';

import {EliteApi,UserSetting} from '../../shared/shared';
import {GamePage} from '../../pages/pages';

import * as _ from 'lodash';
import * as moment from 'moment';

@IonicPage()
@Component({
  templateUrl: '../team-detail/team-detail.html',
})


export class TeamDetailPage {
  isFollowing = false;
  useDateFilter = false;
  allGames : any[];
  dateFilter : string;
  team : any;
  games : any[];
  public teamStanding : any= null;
  private tournamentData : any;
  constructor( private userSetting : UserSetting,
  //  private refresher:Refresher,
    private toastController: ToastController,
    private alertController : AlertController,
    private loadingController : LoadingController,
    private eliteApiService : EliteApi, 
    public navCtrl: NavController,
    public navParams: NavParams) {
          this.team = this.navParams.data;
          this.tournamentData = this.eliteApiService.getCurrentTournament();
          this.teamStanding =  _.find(this.tournamentData.standings,{'teamId' : this.team.id });    
  }

  ionViewDidLoad() {
    let loader = this.loadingController.create({
      content:'Getting Data...'

    });

    loader.present().then(()=>{
      
      this.team = this.navParams.data;
      this.tournamentData = this.eliteApiService.getCurrentTournament();
      
        
      
      this.games = _.chain(this.tournamentData.games)
                    .filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id) 
                    .map(g=>{
                      let isTeam1 = (g.team1Id === this.team.id);
                      let opponentName = isTeam1 ? g.team2 : g.team1;
                      let scoreDisplay  = this.getScoreDisplay(isTeam1,g.team1Score,g.team2Score);
  
                      return{
                        gameId : g.id,
                        opponent : opponentName,
                        time: Date.parse(g.time),
                        location : g.location,
                        locationUrl : g.locationUrl,
                        scoreDisplay : scoreDisplay,
                        homeAway : isTeam1 ? "vs.": "at"   
                      }
                    })
                    .value();
  
    this.allGames=this.games;                
    loader.dismiss();      
    
    this.userSetting.isFavoriteTeam(this.team.id).then(value => this.isFollowing = value);
    });

    
  }

  getScoreDisplay(isTeam1,team1Score,team2Score){
    if(team1Score && team2Score){
      var teamScore  = (isTeam1 ? team1Score : team2Score);
      var opponentScore = (isTeam1 ? team2Score : team1Score);
      var winIndicator  = teamScore > opponentScore ? "W: " : "L";
      return winIndicator + teamScore + "_" + opponentScore; 
    }
    else{
      return "";
    }
  }

  gameClicked($event,game){
    let sourceGame = this.tournamentData.games.find(g=>g.id === game.gameId);
    this.navCtrl.parent.parent.push(GamePage,sourceGame);
  }

  dateChanged(){
    if (this.useDateFilter) {
      this.games = _.filter(this.allGames,g=> moment(g.time).isSame(this.dateFilter,'day'));  
    } else {
      this.games = this.allGames;
    }
    
  }

  getScoreWorL(game){
    return game.scoreDisplay?game.scoreDisplay[0]:'';
  }

  getScoreDisplayBadgeClass(game){
    return game.scoreDisplay.indexOf('W:')  === 0 ? 'primary':'danger';
  }

  toggleFollow(){
    if(this.isFollowing){
      let alert = this.alertController.create({
        title : "Unfollow?",
        message : "Are you sure you want to unfollow?",
        buttons : [
          {
            text : "Yes",
            handler : ()=>{
              this.isFollowing = false;

              //Add more logic

              this.userSetting.unfavoriteTeam(this.team);

              let toast = this.toastController.create({
                message : 'you have unfollowed this team.',
                duration : 2000,
                position : 'bottom'
              });
              toast.present();
            }
          },
          {
            text:'No'
          }

        ]
      });

      alert.present();
    }else{
      this.isFollowing=true;
      this.userSetting.favoriteTeam(this.team,this.tournamentData.tournament.id,this.tournamentData.tournament.name)
      //presist data
    }
  }

  refreshAll(refresher){
    this.eliteApiService.refreshCurrentTournament().subscribe(()=>{
      refresher.complete();
      this.ionViewDidLoad();
    });
  }

}
