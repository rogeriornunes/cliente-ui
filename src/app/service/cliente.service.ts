import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cliente} from "../model/cliente";
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class ClienteService {

  private apiServiceUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public listar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiServiceUrl}/api/clientes`)
  }

  public buscarClientePorId(id: number) {
    return this.http.get<Cliente>(`${this.apiServiceUrl}/api/clientes/${id}`);
  }

  public salvar(cliente: Cliente, formData: FormData): Observable<Cliente> {

    if (cliente.id) {
      return this.atualizar(cliente, formData);
    } else {
      return this.adicionar(cliente, formData);
    }

  }

  private adicionar(cliente: Cliente, formData: FormData): Observable<Cliente> {
    formData.append("clienteData", JSON.stringify(cliente))
    return this.http.post<Cliente>(`${this.apiServiceUrl}/api/clientes`, formData);
  }

  private atualizar(cliente: Cliente, formData: FormData): Observable<Cliente> {
    formData.append("clienteData", JSON.stringify(cliente))
    return this.http.put<Cliente>(`${this.apiServiceUrl}/api/clientes`, formData);
  }

  public deletar(id: number) {
    return this.http.delete<void>(`${this.apiServiceUrl}/api/clientes/${id}`);
  }
}
