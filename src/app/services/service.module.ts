import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

import { 
  SharedService,
  SettingsService,
  SidebarService,
  UsuarioService,
  LoginGuardGuard,
  SubirArchivoService,
  HospitalService
 } from './services.index';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SharedService,
    SettingsService,
    SidebarService,
    UsuarioService,
    LoginGuardGuard,
    SubirArchivoService,
    ModalUploadService,
    HospitalService
  ]
})
export class ServiceModule { }
