import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/services.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugings();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;

  constructor(public router: Router,
    public _usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugings();
  }
  ingresar( forma: NgForm ) {
    
    if ( forma.invalid) {
      return;
    }
    let usuario = new Usuario(null, forma.value.email, forma.value.password);
    
    this._usuarioService.login(usuario, forma.value.recuerdame)
    .subscribe( res => {
      console.log(res);
      
      // this.router.navigate(['/dashboard']);
    });
        
  }

}
