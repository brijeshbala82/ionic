import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Events} from 'ionic-angular'
//import * as _ from 'lodash';

@Injectable()
export class UserSetting {


    constructor(private storage: Storage,private events : Events) {

    }

    favoriteTeam(team, tournamentId, tournamentName) {
        let item = { team: team, TournamentId: tournamentId, TournamentName: tournamentName };
        this.storage.set(team.id.toString(), JSON.stringify(item));
        this.events.publish('favoriteTeams:changed');

        

    }

    unfavoriteTeam(team) {
        this.storage.remove(team.id.toString())
        this.events.publish('favoriteTeams:changed'); 
    }

    isFavoriteTeam(teamId) {
         return this.storage.get(teamId.toString()).then(value => value ? true : false);
    }
     getAllFavorites(){
            return new Promise <any[]>(resolve =>{
                let items = [];
                this.storage.forEach( (value, key, index) => {
                    items.push(JSON.parse(value));
                }).then(()=>{
                    resolve(items);
                    this.events.publish('favoriteTeams:changed'); 
                });
            })
      
    }


    

    
}


