import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Cliente} from "../modelo/cliente";
import {ClienteService} from "../service/cliente.service";
import {HttpErrorResponse} from "@angular/common/http";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PagerService} from "../service/pager.service";

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  constructor(private clienteService: ClienteService, private pagerService: PagerService, private formBuilder: FormBuilder) {
  }
  tipos = [
    {name: 'Pessoa Fisica', sigla: 'PF'},
    {name: 'Pessoa Juridica', sigla: 'PJ'}
  ];

  formCliente = new FormGroup({
    tipo: new FormControl(this.tipos[2])
  });

  @ViewChild('btnFechar') private btnFechar!: ElementRef<HTMLElement>;
  @ViewChild('divPrincipal') private divPrincipal!: ElementRef<HTMLElement>;

  query = '';
  clientesVisiveis: Cliente[] = [];
  clientesPaginadas: Cliente[] = [];
  clientes: Cliente[] = [];
  clienteSelecionado: Cliente = ClienteComponent.criarCliente();
  pager: any = {};
  tipoPessoaSelecionado: boolean | undefined;
  tipoPessoa: string | undefined;
  selectedDefault = this.tipos[0];
  ngOnInit(): void {
    this.listar();

    this.formCliente = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      tipo: ['', [Validators.required]],
      cpf: ['', []],
      cnpj: ['', []]
    });
  }

  static criarCliente(): Cliente {
    return {
      id: 0,
      nome: '',
      rg: '',
      cpf: '',
      cnpj: '',
      ie: '',
      telefonePrincipal: '',
      telefoneAlternativo: '',
      status: false,
      tipo: '',
      dataCadastro: ''
    }
  }
  get f() { return this.formCliente.controls; }

  public listar() {
    this.clienteService.listar().subscribe((response: Cliente[]) => {
        this.clientes = response;
        this.clientesVisiveis = this.clientes;
        this.clientesPaginadas = this.clientes;
        this.onMudarPaginas(1);
      },
      (error: HttpErrorResponse) => {
        console.error(error.message)
      }
    );
  }

  public adicionar() {
    this.clienteSelecionado = ClienteComponent.criarCliente();
    this.abrirDetalhe(this.clienteSelecionado, 'add');
  }

  public abrirDetalhe(cliente: Cliente, operacao: string) {
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (operacao === 'add') {
      button.setAttribute('data-target', '#clienteModal');
    }
    if (operacao === 'edit') {
      this.clienteSelecionado = cliente;
      this.setSelectedTipoPessoa()
      button.setAttribute('data-target', '#clienteModal');
    }
    if (operacao === 'delete') {
      this.clienteSelecionado = cliente;
      button.setAttribute('data-target', '#deleteClienteModal');
    }
    this.divPrincipal.nativeElement.appendChild(button);
    button.click();

  }

  filtrarClientes() {
    const results: Cliente[] = [];
    this.clientesVisiveis = this.clientes;
    for (const cliente of this.clientesVisiveis) {
      if (cliente.nome?.toLowerCase().indexOf(this.query.toLowerCase()) !== -1) {
        results.push(cliente);
      }
    }
    this.clientesVisiveis = results;
    if (results.length === 0 || !this.query) {
      this.listar();
    }
    this.onMudarPaginas(1);
  }

  public salvarCliente() {
    const form = new FormData();

    this.btnFechar.nativeElement.click();
    this.setSelectedTipoPessoa();

    if (this.clienteSelecionado) {
      this.clienteSelecionado.tipo = this.tipoPessoa;
      this.clienteService.salvar(this.clienteSelecionado, form).subscribe(
        (response: Cliente) => {
          console.log(response);
          this.listar();
          ClienteComponent.criarCliente();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
      this.limparTipoPessoa();
    }
  }

  public deletar(id: number | undefined): void {
    if (id) {
      this.clienteService.deletar(id).subscribe(
        (response: void) => {
          console.log(response);
          this.listar();
        },
        (error: HttpErrorResponse) => {
          console.error(error.message);
        }
      );
    }
  }

  onchangeTipoPessoa(value: any) {
    this.tipoPessoa = value.name;
    if (value.sigla === "PF") {
      this.tipoPessoaSelecionado = true;
    } else {
      this.tipoPessoaSelecionado = false;
    }
  }

  onMudarPaginas(pagina: number) {
    this.pager = this.pagerService.getPager(this.clientesVisiveis.length, pagina);
    this.clientesPaginadas = this.clientesVisiveis.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  limparTipoPessoa(){
    this.tipoPessoa = "";
    this.selectedDefault = this.tipos[0];
  }

  setSelectedTipoPessoa() {
      if (this.clienteSelecionado.tipo === 'Pessoa Fisica') {
        this.selectedDefault = this.tipos[0];
      } else {
        this.selectedDefault = this.tipos[1];
      }
  }

}
