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
  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient
  ) {
    console.log(' Servicio del usuario listo ');
   }
  
   guardarStorage( id: string, token: string, usuario: Usuario) {
        localStorage.setItem( 'id', id );
        localStorage.setItem( 'token', token );
        localStorage.setItem( 'usuario', JSON.stringify(usuario) );

        this.usuario = usuario;
        this.token = token;
   }

   loginGoogle(token: string) {

    let url = `${URL_SERVICIOS}/login/google`;
    return this.http.post(url, {token}).pipe(
      map( (resp: any) => {
        this.guardarStorage( resp.id, resp.token, resp.usuario);
        return true;
      })
    );
                

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

        this.guardarStorage( resp.id, resp.token, resp.usuario);

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
