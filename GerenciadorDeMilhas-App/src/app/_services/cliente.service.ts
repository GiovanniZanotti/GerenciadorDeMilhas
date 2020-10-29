import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../_models/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  baseURL = 'http://localhost:5000/api/clientes';

constructor(private http: HttpClient) {}

getAllClientes(): Observable<Cliente[]> {
  // tslint:disable-next-line:object-literal-key-quotes
  // const tokenHeaders = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('token')}`});

  return this.http.get<Cliente[]>(this.baseURL);
}

getClientesByNome(nome: string): Observable<Cliente[]> {
  return this.http.get<Cliente[]>(`${this.baseURL}/getByNome/${nome}`);
}

getClienteById(id: number): Observable<Cliente> {
  return this.http.get<Cliente>(`${this.baseURL}/${id}`);
}

postCliente(cliente: Cliente) {
  return this.http.post(this.baseURL, cliente);
}

updateCliente(cliente: Cliente) {
  return this.http.put(`${this.baseURL}/${cliente.id}`, cliente);
}

DeleteCliente(cliente: Cliente) {
  return this.http.delete(`${this.baseURL}/${cliente.id}`);
}

}
