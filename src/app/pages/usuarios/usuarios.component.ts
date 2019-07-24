import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/services.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
    ) { }

  ngOnInit() {
    this.cargarUsuarios();
    // Suscribirse a cualquier notificacion
    this._modalUploadService.notificacion.subscribe( resp => this.cargarUsuarios() );
  }
  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('usuarios', id);
  }
  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios( this.desde ).subscribe((resp: any) => {
      this.totalRegistros = resp.total;  
      this.usuarios = resp.usuarios;   
      this.cargando = false; 
    });
  }

  cambiarDesde(valor: number) { 
    let desde = this.desde + valor;
        
    if ( desde >= this.totalRegistros || desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }
  
  buscarUsuario(termino: string) {
  
    if ( termino.length <= 0 ) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;

    this._usuarioService.busquedaUsuarios( termino )
    .subscribe( (usuarios: Usuario[]) => {
      this.usuarios = usuarios;
      this.cargando = false;      
    } );
  }

  borrarUsuario( usuario: Usuario ) {
  
    if ( usuario._id === this._usuarioService.usuario._id ) {
      Swal.fire('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }
    
    Swal.fire({
      title: 'Are you sure?',
      text: 'You wont be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
            
      if (result.value) {
        this._usuarioService.borrarUsuario(usuario._id)
        .subscribe( ( borrado: boolean ) => {
          this.cargarUsuarios();
        });
      }
    });
  }
  
  guardarUsuario( usuario: Usuario ) {
    console.log(usuario);
    this._usuarioService.actualizarUsuario(usuario)
    .subscribe();
  }
}
