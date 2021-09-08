import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://login-app-edb50.firebaseio.com';

  constructor( private http: HttpClient) { }

  crearHeroe( heroe: HeroeModel) {

    return this.http.post(` ${ this.url }/heroes.json`, heroe)
             .pipe(
               map( (resp: any ) => {
                 heroe.id = resp.name;
                 return heroe;
               })
             )
  }


  actualizarHeroe( heroe: HeroeModel) {

    const heroeTemp = {
      ...heroe
    };

    delete heroeTemp.id;
    return this.http.put( `${ this.url }/heroes/${ heroe.id }`, heroeTemp);
  }


  getHeroes() {
    return this.http.get( `${ this.url }/heroes.json`)
             .pipe(
               map( this.crearArreglo )
             );
  }

  private crearArreglo( heroesObj: object) {

    const heroes: HeroeModel[] = [];

    console.log( Object.keys( heroesObj ) );

    if( heroesObj === null ) {
      return [];
    }

    let varAux = 0;

    Object.keys( heroesObj ).forEach( key => {

      const heroe: HeroeModel = heroesObj[varAux];
      console.log( heroesObj[varAux] );
      heroe.id = key;

      heroes.push( heroe );
      varAux++;
    });

    return heroes;
  }
}
