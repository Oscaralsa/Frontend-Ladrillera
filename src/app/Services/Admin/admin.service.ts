import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { NgModuleResolver } from '@angular/compiler';
import { AuthService } from '../Auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private url = `${environment.apiUrl}/administracion`;

  constructor(private http: HttpClient, private auth: AuthService) { }

  //Administration methods

  createEmployee(name, lastname, cedula, gender, bornDate, rol, correo, contrasena, fileToUp: File, modulos) {
    const opts = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.auth.readToken(),
      })
    };
    const fd = new FormData();
    fd.append('nombre', name);
    fd.append('apellido', lastname);
    fd.append('cedula_ciudadania', cedula);
    fd.append('genero', gender);
    fd.append('fecha_nacimiento', bornDate);
    fd.append('rol', rol);
    fd.append('email', correo);
    fd.append('password', contrasena);
    fd.append('foto', fileToUp);
    fd.append('modulo_ids', '[1]');
    //

    console.log(fd);
    return this.http.post(
      `${this.url}/empleados`,
      fd,
      opts
    ).pipe(
      map(resp => {
        console.log(resp);
      })
    );
  }

  searchEmployee(id) {
    const opts = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.auth.readToken(),
      })
    };
    return this.http.get(`${this.url}/empleados/${id}`, opts);
  }
  createComunicado(titulo, descripcion, fecha) {
    const opts = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.auth.readToken(),
      })
    };
    console.log(titulo);
    const authData = {
      titulo,
      descripcion,
      fecha
    };
    return this.http.put(
      `${environment.apiUrl}/actualizaciones/1`,
      authData,
      opts
    ).pipe(
      map(resp => {
        console.log(resp);
      })
    );
  }
  getComunicado() {
    const opts = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.auth.readToken(),
      })
    };
    return this.http.get(
      `${environment.apiUrl}/actualizaciones/1`, opts
    );
  }
  updateEmployee(id, name, lastname, cedula, gender, bornDate, rol, correo, contrasena, modulos) {
    const opts = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.auth.readToken(),
      })
    };
    const fd = new FormData();
    fd.append('id_empleado', id);
    fd.append('nombre', name);
    fd.append('apellido', lastname);
    fd.append('cedula_ciudadania', cedula);
    fd.append('genero', gender);
    fd.append('fecha_nacimiento', bornDate);
    fd.append('rol', rol);
    fd.append('email', correo);
    fd.append('password', contrasena);
    // fd.append('foto', fileToUp);
    fd.append('modulo_ids', '[1]');
    //

    console.log(fd);
    return this.http.post(
      `${this.url}/empleados/${id}?_method=PUT`,
      fd,
      opts
    ).pipe(
      map(resp => {
        console.log(resp);
      })
    );
  }

  public getEmployees() {
    const opts = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.auth.readToken(),
      })
    };
    return this.http.get(`${this.url}/empleados`, opts);
  }

  getEmployInitial(id) {
    const opts = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.auth.readToken(),
      })
    };
    return this.http.get(`${this.url}/empleados/${id}?type=link`, opts);
  }
}
