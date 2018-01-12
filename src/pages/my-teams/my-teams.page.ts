import { Component, OnInit } from '@angular/core';
import {NavController,LoadingController} from 'ionic-angular'
import {TournamentsPage,TeamHomePage} from '../pages'
import {EliteApi,UserSetting} from '../../shared/shared'

@Component({
    templateUrl: '../my-teams/my-teams.pages.html'
})

export class MyTeamsPages implements OnInit {

    public fevorites =[];

    //     {
    //         team: {id:6182,name : 'HC Elite 7th',coach : 'Mecelotti'},
    //         TournamentId : '89e13aa2-ba6d-4f55-9cc2-61eba6172c63',
    //         TournamentName : 'March Madness Tournament'
    //     },
    //     {
    //         team: {id:805,name : 'HC Elite',coach : 'Mecelotti'},
    //         TournamentId : '98c6857e-b0d1-4295-b89e-2d95a45437f2',
    //         TournamentName : 'Holiday Hoops Challenge'
    //     }
        
    // ];

    constructor(private nav : NavController,
        private loadingController : LoadingController,
    private eliteService : EliteApi,private userSetting : UserSetting) { }

    ngOnInit() { }
    goToTournament=()=>{
        this.nav.push(TournamentsPage);
    }

    fevoriliteTapped($event,favorite){
        let loader = this.loadingController.create({
            content : 'Getting data...',
            dismissOnPageChange : true
        });

        loader.present();

        this.eliteService.getTournamentData(favorite.TournamentId).subscribe(
            t=> this.nav.push(TeamHomePage,favorite.team));
    }

    ionViewDidEnter(){
        var that = this;
         this.userSetting.getAllFavorites().then(function(result){
            that.fevorites = result;
        });
    }
}