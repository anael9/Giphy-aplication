import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, LOCALE_ID } from '@angular/core';
import { Gif, SearchGIF } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private url: string = 'https://api.giphy.com/v1/gifs';
  private apiKey: string = 'DBvJDv3rF6xnbQ6w1ZVeKCZyiKjxKOPI';
  private _historial: string[] = [];
  public resultados: Gif[] =[];

  get historial() {
    return[...this._historial];
  }

  /**
   *
   */
  constructor( private http: HttpClient) {

      this._historial = JSON.parse( localStorage.getItem( 'Historial' )!) || [];
      this.resultados = JSON.parse( localStorage.getItem( 'resultados' )!) || [];

   }

  buscarGifs( query: string  = '' ) {
    
    query = query.trim().toLocaleUpperCase();

    if ( !this._historial.includes( query )) {
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,9);

      localStorage.setItem( 'Historial', JSON.stringify( this._historial ) );
    }

    const params = new HttpParams()
          .set( 'api_key', this.apiKey )
          .set( 'limit', 10 )
          .set( 'q', query );    

    this.http.get<SearchGIF>( `${ this.url }/search`, { params } )
    .subscribe( ( resp: any ) => {
      console.log( resp.data )
      this.resultados = resp.data;
      localStorage.setItem( 'resultados', JSON.stringify( this.resultados ) );
    });
  }
}
