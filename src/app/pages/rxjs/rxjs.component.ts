import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  suscription: Subscription;

  constructor() { 

    // this.regresaObservable().pipe( 
    //   retry( 2 ) // reiniciar observable (2) número de intentos
    //  ).subscribe( 
    //   numero => console.log( 'Subs', numero ),
    //   err => console.log( 'Error en los obs', err ),
    //   () => console.log( 'El observador termino' )
    // );
    this.suscription = this.regresaObservable().subscribe( 
      numero => console.log( 'Subs', numero ),
      err => console.log( 'Error en los obs', err ),
      () => console.log( 'El observador termino' )
    );

  }

  ngOnInit() {
  }
  // Funcion que ejecuta cada vez que se deja la página
  ngOnDestroy() {
    console.log(`La página se va a cerarr`);
    this.suscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {
    return new Observable( observer => {
      let contador = 0;
      let intervalo = setInterval( () => {
          contador += 1;

          const salida =  {
            valor: contador
          };
          observer.next( salida ); // Salida observer

          // if ( contador === 3 ) {
          //   clearInterval( intervalo );
          //   observer.complete();
          // }
          // if ( contador === 2 ) {
          //    // clearInterval( intervalo );
          //   observer.error( 'Auxilio' );
          // } 
      }, 1000);
    }).pipe(
      map( ( resp: any ) => resp.valor ), // Operacion map
      filter( ( valor, index ) => (valor % 2) === 1 ) // filter por numero impar
    );   
  }
}

