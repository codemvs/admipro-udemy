import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/services.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugings();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  email: string;
  recuerdame: boolean = false;

  auth2: any;

  constructor(public router: Router,
    public _usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugings();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '361597151690-jtes1vbt6optmabse0kslh0b1r1r5uqs.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSingin( document.getElementById('btnGoogle') );
    });
  }
  attachSingin( element ) {
    this.auth2.attachClickHandler( element, {}, googleUser => {
      let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      
      this._usuarioService.loginGoogle( token )
          .subscribe( () => window.location.href = '#/dashboard' );
    });
  }

  ingresar( forma: NgForm ) {
    
    if ( forma.invalid) {
      return;
    }
    let usuario = new Usuario(null, forma.value.email, forma.value.password);
    
    this._usuarioService.login(usuario, forma.value.recuerdame)
    .subscribe( logOk => this.router.navigate(['/dashboard']) );
        
  }

}
