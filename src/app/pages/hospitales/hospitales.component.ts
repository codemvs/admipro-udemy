import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/services.index';
import { Hospital } from 'src/app/models/hospital.model';
import Swal from 'sweetalert2';

import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  totalHospitales: number = 0;
  hospitales: Hospital = null;
  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion.subscribe(() => this.cargarHospitales());
  }

  cargarHospitales() {
    this._hospitalService.cargarHospitales()
      .subscribe((res: any) => {
        this.hospitales = res.hospitales;
        this.totalHospitales = res.total;
      });
  }

  async crearHospital() {

    const { value: nombreHospital } = await Swal.fire({
      title: 'Ingrese un hospital',
      input: 'text',
      inputPlaceholder: 'Hospital'
    });

    this._hospitalService.crearHospital(nombreHospital)
      .subscribe((res: any) => {

        this.cargarHospitales();
      });
  }

  buscarHospital(termino: string) {
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this._hospitalService.buscarHospital(termino).subscribe(
      (hospitales: any) => this.hospitales = hospitales
    );
  }

  borrarHospital(hospital: Hospital) {
    this._hospitalService.borrarHospital(hospital._id)
      .subscribe((resp: any) => {

        this.cargarHospitales();
      }
      );
  }

  actualizarHospital(hospital: Hospital) {
    this._hospitalService.actualizarHospita(hospital).subscribe();
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('hospitales', id);
  }
}
