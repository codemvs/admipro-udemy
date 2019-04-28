import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    public http: HttpClient
  ) {
    console.log(' Servicio del usuario listo ');
   }
  login(usuario: Usuario, recordar: boolean = false) {
    
    localStorage.removeItem('email');
    if ( recordar ) {
      localStorage.setItem('email', usuario.email);
    }
    
    let url = `${URL_SERVICIOS}/login`;
    return this.http.post( url, usuario).pipe(
      map( (resp: any) => {
        // grabar informacion en local storage
        localStorage.setItem( 'id', resp.id );
        localStorage.setItem( 'token', resp.token );
        localStorage.setItem( 'usuario', JSON.stringify(resp.usuario) );

        return true;

      })
    );
  }
   crearUsuario( usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario).pipe(
      map( (resp: any) => {
        console.log(resp);
        Swal.fire('Usuario creado', usuario.email, 'warning');
        return resp.usuario;
      })
    );

   }
}
