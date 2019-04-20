import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { 
  SharedService,
  SettingsService,
  SidebarService,
  UsuarioService
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
    UsuarioService
  ]
})
export class ServiceModule { }
