import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirArchivoService } from 'src/app/services/services.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: []
})
export class ModalUploadComponent implements OnInit {
  
  imagenSubir: File;
  imagenTemp: string;

  constructor(
    public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
  }

  subirImagen() {
    this._subirArchivoService.subirArchivo( this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id )
        .then( resp => { 
          this._modalUploadService.notificacion.emit( resp );
          this.cerrarModal();
        })
        .catch( err => {});
  }

  cerrarModal() {
    this.imagenSubir = null;
    this.imagenTemp = null;
    this._modalUploadService.ocultarModal();
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
  
}
