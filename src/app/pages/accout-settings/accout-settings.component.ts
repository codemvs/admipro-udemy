import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { SettingsService } from 'src/app/services/services.index';


@Component({
  selector: 'app-accout-settings',
  templateUrl: './accout-settings.component.html',
  styles: []
})
export class AccoutSettingsComponent implements OnInit {
  
  constructor( public _ajustes: SettingsService ) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor( tema: string, tagLink: ElementRef ) {
    
    this.checkList( tagLink );
    this._ajustes.aplicarTema(tema);
  }

  checkList( tagLink: any) {
    
    let linkSettings: any = document.getElementsByClassName('selector');    
    
    // for in : Hace referencia a las llaves
    // for (const key in linkSettings) {
    //   console.log(key);      
    // }
    
    // For of: Hace referencia a los items
    for (const iterator of linkSettings) {
      iterator.classList.remove('working');
    }
    tagLink.classList.add('working');
  }

  colocarCheck() {
    let linkSettings: any = document.getElementsByClassName('selector');    
    let tema = this._ajustes.ajustes.tema;
    // For of: Hace referencia a los items
    for (const item of linkSettings) {
      if ( item.getAttribute('data-theme') === tema ) {
        item.classList.add('working');
      }
    }
    
  }

}
