import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import 'rxjs'
import {Observable} from 'rxjs/Observable'

@Injectable()
export class EliteApi {
    private baseUrl = "https://elite-schedule-app-f9a6d.firebaseio.com";
    constructor(private http : Http) { }
    curentTournament : any = {};
    Tournament : any = {};
    getTournaments(){
        return new Promise(resolve =>{
            this.http.get(`${this.baseUrl}/tournaments.json`)
            .subscribe(res=>resolve(res.json()));
        })
    }

    getTournamentData (tournamentId,forceRefresh : boolean = false) : Observable<any>{

        if(!forceRefresh && this.Tournament[tournamentId]){
            this.curentTournament = this.Tournament[tournamentId];
            console.log('**No Need to make HTTP call, just return the data**');
            return Observable.of(this.curentTournament);
        }
        //Dont have Data yet
        console.log('**Need to make HTTP call**');
        return this.http.get(`${this.baseUrl}/tournaments-data/${tournamentId}.json`)
            .map((response: Response) =>{
                this.Tournament[tournamentId] = response.json();
                this.curentTournament = this.Tournament[tournamentId]
                return this.curentTournament;
            });
        
    } 
    // getTournamentData (tournamentId) : Observable<any>{
    //     return this.http.get(`${this.baseUrl}/tournaments-data/${tournamentId}.json`)
    //         .map((response: Response) =>{
    //             this.curentTournament = response.json();
    //             return this.curentTournament;
    //         });
        
    // }

    getCurrentTournament(){
        return this.curentTournament;
    }

    refreshCurrentTournament(){
        return this.getTournamentData(this.curentTournament.tournament.id,true);
    }
}