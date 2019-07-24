import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: any, tipo: string = 'usuario'): any {
    console.log(img, tipo);
    
    let url = `${URL_SERVICIOS}/img`;
    let tiposValidos = [{tipo: 'usuario', valor: 'usuarios'},
                       {tipo: 'medico', valor: 'medicos'},
                       {tipo: 'hospital', valor: 'hospitales'}];    
    if ( !img ) {
      return `${url}/usuarios/xxx`;
    }

    if ( img.indexOf('https') >= 0 ) {
      return img;
    }
    
    let tipoSeleccionado = tiposValidos.find(item => item.tipo === tipo);
        
    if (!tipoSeleccionado) {
      return `${url}/usuarios/xxx`;
    }
    return `${url}/${tipoSeleccionado.valor}/${img}`;
  }

}
