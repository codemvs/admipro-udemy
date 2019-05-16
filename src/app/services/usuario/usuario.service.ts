import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario;
  token: string;

  constructor( public http: HttpClient,
                public router: Router,
                public _subirArchivoService: SubirArchivoService ) {
    this.cargarStorage();
   }
  
   estaLogueado() {
     return  this.token.length > 5;
   }
   cargarStorage() {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';   
      this.usuario = null;   
    }
   }

   guardarStorage( id: string, token: string, usuario: Usuario) {
        localStorage.setItem( 'id', id );
        localStorage.setItem( 'token', token );
        localStorage.setItem( 'usuario', JSON.stringify(usuario) );

        this.usuario = usuario;
        this.token = token;
   }
  
   loguout() {
     this.usuario = null;
      this.token = '';

      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      
      this.router.navigate(['/login']);
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
        
        Swal.fire('Usuario creado', usuario.email, 'success');
        return resp.usuario;
      })
    );

   }

   actualizarUsuario(usuario: Usuario) {
      let url = `${URL_SERVICIOS}/usuario/${usuario._id}?token=${this.token}`;
      return this.http.put(url, usuario).pipe(
        map( (resp: any ) => {
          // this.usuario = resp.usuario;
          let usuarioDB: Usuario = resp.usuario;
          this.guardarStorage(usuarioDB._id, this.token, usuarioDB);
          Swal.fire('Usuario actualizado', usuario.email, 'success');
          return true;
        })
      );
   }

   cambiarImagen( archivo: File, id: string) {
     console.log(id, archivo);
    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id )
        .then( (resp: any) => {
          
          this.usuario.img = resp.usuario.img;
          Swal.fire('Imagen actualizado', this.usuario.nombre, 'success');
          this.guardarStorage(id, this.token, this.usuario);
        })
        .catch( (err: any) => {
          console.log(err);
          
        });
   } 

   cargarUsuarios( desde: number = 0) {
    let url = `${URL_SERVICIOS}/usuario?desde${desde}`;
    return this.http.get(url);
   }

   busquedaUsuarios( termino: string ) {
    let url = `${URL_SERVICIOS}/busqueda/coleccion/usuarios/${termino}`;
    return this.http.get( url ).pipe(
      map( (resp: any) => resp.usuarios)
    );
   }
}
