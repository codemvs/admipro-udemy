import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/services.index';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];
  constructor(
    public _medicosService: MedicoService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
  }
  cargarMedicos(){
    this._medicosService.cargarMedicos()
    .subscribe(meicos => this.medicos = meicos);
  }

}
