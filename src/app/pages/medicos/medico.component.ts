import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { MedicoService, HospitalService } from 'src/app/services/services.index';
import { Medico } from 'src/app/models/medico.model';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {
  hospitales: Hospital[] = [];
  medico: Medico = new Medico();
  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService
  ) { }

  ngOnInit() {
    this._hospitalService.cargarHospitales().subscribe((hospitales: any) => {
      this.hospitales = hospitales.hospitales;
      console.log(hospitales);
      
    });
    
    
  }
  guardarMedico(f: NgForm) {
    console.log(f.valid);
    console.log(f.value);


  }
}
