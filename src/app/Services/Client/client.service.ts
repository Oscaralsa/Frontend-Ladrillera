import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(public http: HttpClient, public auth: AuthService) { }
  private url = 'https://e57779089ae4.ngrok.io/api';

  //Creates a new client

  public createClient(id_empleado_asociado, nombre, apellido, cc_nit, tipo_cliente, ciudad, correo, telefono) {
    const authData = {
      id_empleado_asociado: id_empleado_asociado,
      nombre: nombre,
      apellido: apellido,
      cc_nit: cc_nit,
      tipo_cliente: tipo_cliente,
      ciudad: ciudad,
      correo: correo,
      telefono: telefono,
    };
    const opts = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.auth.readToken(),
      })
    }
    return this.http.post(`${this.url}` + '/clientes',
      authData, opts);
  }

  // create a request to create a client
  public requestClient(nombre, telefono) {
    const authData = {
      nombre: nombre,
      telefono: telefono,
    };
    const opts = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.auth.readToken(),
      })
    }
    return this.http.post(`${this.url}` + '/solicitud_clientes',
      authData, opts);
  }
  public updateRequest(res){
    const authData = {
      id: res.id,
      nombre: res.nombre,
      telefono: res.telefono,
      creado: true
    };
    const opts = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.auth.readToken(),
      })
    }
    return this.http.put(`${this.url}` + '/solicitud_clientes/'+res.id,
      authData, opts);
  }
  getClientByCCNIT(id) {
    const opts = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.auth.readToken(),
      })
    }
    return this.http.get(`${this.url}/clientes/${id}?unique_column=cc_nit`,
      opts);
  }
  getClientByid(id) {
    const opts = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.auth.readToken(),
      })
    }
    return this.http.get(`${this.url}/clientes/${id}?unique_column=id`,
      opts);
  }
  //get clientsRequests
  public getClientRequests(status) {
    const opts = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.auth.readToken(),
      })
    }
    return this.http.get(`${this.url}` + '/solicitud_clientes?creado=' + status,
      opts);
  }
}
