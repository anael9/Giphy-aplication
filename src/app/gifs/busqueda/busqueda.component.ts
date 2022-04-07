import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent{

  @ViewChild('txtbuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  /**
   *
   */
  constructor( private gifsService: GifsService ) {}

  buscar() {

    const value = this.txtBuscar.nativeElement.value;
    
    this.gifsService.buscarGifs( value );

    this.txtBuscar.nativeElement.value = '';
  }
}
