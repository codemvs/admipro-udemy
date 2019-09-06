import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { MedicoService, HospitalService } from 'src/app/services/services.index';
import { Medico } from 'src/app/models/medico.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('', '', null);

  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public router: Router
  ) { }

  ngOnInit() {
    this._hospitalService.cargarHospitales().subscribe((hospitales: any) => {
      this.hospitales = hospitales.hospitales;
      console.log(hospitales);

    });


  }
  guardarMedico(f: NgForm) {

    if (f.invalid) {
      return false;
    }
    this._medicoService.guardarMedico(this.medico)
      .subscribe((medico: any) => {
        this.medico._id = medico._id;
        this.router.navigate(['/medico', medico._id]);
      });
  }

  cambioHospital(id: string) {
    console.log(id);

    this._hospitalService.obtenerHospital(id).subscribe((hospital: any) => {
      this.hospital = hospital;
      console.log(this.hospital);

    });
  }
}
