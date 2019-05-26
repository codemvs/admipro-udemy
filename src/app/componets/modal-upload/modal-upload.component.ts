import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  ocultar: string = '';


  imagenSubir: File;
  imagenTemp: string;
  
  constructor() {
    console.log('Modal Listo');
    
   }


  ngOnInit() {
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

  subirImagen() {
    console.log('oor');
    
  }

}
