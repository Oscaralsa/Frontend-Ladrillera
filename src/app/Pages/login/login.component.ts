import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/Services/Auth/auth.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/Admin/admin.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  isChecked: boolean = false;
  constructor(private auth: AuthService, private router: Router,private admin: AdminService) { }

  ngOnInit(): void { }

  login(form: NgForm) {

    if (form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor'
    });
    Swal.showLoading();

    this.auth.login(this.usuario, this.isChecked).subscribe(resp => {
    const name= `${resp['empleado']['nombre']} ${resp['empleado']['apellido']}`;
    localStorage.setItem('rol', resp['empleado']['rol']);
    localStorage.setItem('name', name);
      Swal.close();
      this.admin.getEmployInitial(resp['empleado']['id']).subscribe(res=>{
        localStorage.setItem('foto', res['foto']);
        this.router.navigate([]).then(result => { window.location.href = "/home"; });
      })
    }, (err) => {
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Error al autenticar',
        text: "Revisa tus credenciales antes de acceder"
      });
      console.log(err)
    });
  }

}
