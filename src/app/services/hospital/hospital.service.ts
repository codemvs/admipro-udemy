import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Hospital } from 'src/app/models/hospital.model';

import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(
    public http: HttpClient,
    public router: Router,
    public _usuarioService: UsuarioService
  ) {
  }

  cargarHospitales() {
    let url = `${URL_SERVICIOS}/hospital`;
    return this.http.get(url);
  }

  crearHospital(nombre: string) {
    let url = `${URL_SERVICIOS}/hospital?token=${this._usuarioService.token}`;

    return this.http.post(url, { nombre }).pipe(
      map((resp: any) => {
        Swal.fire('Hospital creado', 'Se creo correctamente', 'success');
        return resp.hospital;
      })
    );
  }

  obtenerHospital(id: string) {
    let url = `${URL_SERVICIOS}/hospital/${id}`;
    return this.http.get(url).pipe(
      map((resp: any) => resp.hospital)
    );
  }

  borrarHospital(id: string) {
    let url = `${URL_SERVICIOS}/hospital/${id}/?token=${this._usuarioService.token}`;
    return this.http.delete(url).pipe(
      map((resp: any) => {
        Swal.fire('Hospital borrado', 'Eliminado correctamente', 'success');
        return resp.hospital;
      })

    );
  }

  actualizarHospita(hospital: Hospital) {
    let url = `${URL_SERVICIOS}/hospital/${hospital._id}/?token=${this._usuarioService.token}`;
    return this.http.put(url, hospital).pipe(
      map((resp: any) => {
        Swal.fire('Actualizar hospital', 'Se actualizo correctamente', 'success');
        return resp.hospital;

      })
    );
  }

  buscarHospital(termino: string) {
    let url = `${URL_SERVICIOS}/busqueda/coleccion/hospitales/${termino}`;
    return this.http.get(url).pipe(
      map((resp: any) => resp.hospitales)
    );
  }

}
