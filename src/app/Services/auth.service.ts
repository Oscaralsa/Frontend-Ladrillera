import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = ' http://fa5c0732e38c.ngrok.io/api/auth'

  userToken: string;
  expiresAt: string;

  constructor(private http: HttpClient) {
    this.readToken();
  }

  //LOGOUT*************************************
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires');
  }

  //LOGIN*************************************
  login(usuario: UsuarioModel, remember: boolean) {
    const authData = {
      ...usuario,
      remember_me: remember
    };
    return this.http.post(
      `${this.url}/login`,
      authData
    ).pipe(
      map(resp => {
        this.saveToken(resp['access_token'], resp['expires_at']);
        return resp;
      })
    );

  }

  //REGISTER*************************************
  register(usuario: UsuarioModel, nombre, contraseña) {
    const authData = {
      name: nombre,
      ...usuario,
      password_confirmation: contraseña
    };
    return this.http.post(
      `${this.url}/signup`,
      authData
    ).pipe(
      map(resp => {
        this.saveToken(resp['access_token'], resp['expires_at']);
        return resp;
      })
    );
  }
  //SAVETOKEN*************************************
  private saveToken(idToken: string, expiresAt: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
    let today = new Date(expiresAt);
    localStorage.setItem("expires", today.getTime().toString());
  }

  //READTOKEN*************************************
  readToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
      return this.userToken;
    } else {
      this.userToken = '';
      return false;
    }
  }

  //AUTHENTICATED*************************************
  authenticated(): boolean {
    if (this.userToken.length < 2) {
      console.log('false');
      return false;
    } else {
      console.log('true');
      return true;
    }

  }

  //VALIDATEUSER
  validateUser() {

    const opts = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.readToken()
      })
    }
    return this.http.get(
      (`${this.url}/user`),
      opts
    ).pipe(
      map(resp => {
        return resp['name'];
      })
    );
  }
}
