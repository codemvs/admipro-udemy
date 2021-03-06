import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/services.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  imagenSubir: File;
  imagenTemp: string;

  constructor(
    public _usuarioService: UsuarioService
  ) { 
    this.usuario = this._usuarioService.usuario;
    
  }

  ngOnInit() {
  }

  guardar( usuario: Usuario ) {
    this.usuario.nombre = usuario.nombre;

    if (!this.usuario.google) {
      this.usuario.email = usuario.email;  
    }    

    this._usuarioService.actualizarUsuario( this.usuario )
        .subscribe();
  }

  seleccionImagen( archivo: File ) {
    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }
    // filtrar solo imagenes
    if (archivo.type.indexOf('image') < 0 ) {
      this.imagenSubir = null;
      Swal.fire('error', 'Solo imagenes', 'error');
      return;
    }
    
    this.imagenSubir = archivo;

    // Vista previa imagen temporal
    let render = new FileReader();
    let urlTemporal = render.readAsDataURL(archivo);

    render.onloadend = () => this.imagenTemp = render.result.toString();
  } 
  
  cambiarImagen() {
    this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id );
  }
}
