import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth.service';

@Injectable({
  providedIn: 'root'
})
export class CreateOrderService {

  private url = ' http://45782557f82e.ngrok.io/api/ventas/pedidos';
  productos: any[] = [];
  // productos: any[] = [{
  //   "codigo_producto": 'LAD21-MATCO',
  //   "cantidad": 1,
  //   "unidad_medicion": '121',
  //   "valor_total": 232
  // },
  // {
  //   "codigo_producto": 'LAD21-MALLA',
  //   "cantidad": 1,
  //   'unidad_medicion': '121',
  //   'valor_total': 232
  // }
  // ];
  constructor(private http: HttpClient, private auth: AuthService) { }

  public createOrder(productos: any[], fecha: string, total: string) {
    productos.forEach(p => {
      const products = {
        'codigo_producto': p.codigo_producto,
        "cantidad": p.cantidad,
        "unidad_medicion": p.unidad_medicion,
        "valor_total": p.valor
      };
      this.productos.push(products);
    });
    const opts = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.auth.readToken(),
      })
    };
    const body = {
      'id_cliente': '1',
      'fecha_cargue': fecha,
      'total': total,
      'productos': this.productos
    };
    console.log(body);
    // const fd = new FormData();
    // fd.append('id_cliente', '1');
    // fd.append('fecha_cargue', '23/11/2020');
    // fd.append('total', '541561');
    // fd.append('productos', JSON.stringify(this.productos));
    return this.http.post(`${this.url}`, body, opts);
  }
  public getPedidos() {
    const opts = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.auth.readToken(),
      })
    };
    return this.http.get(`${this.url}`, opts);
  }

  public getPedidoId(id: number) {
    const opts = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.auth.readToken(),
      })
    };
    return this.http.get(`${this.url}/${id}`, opts);
  }
}
