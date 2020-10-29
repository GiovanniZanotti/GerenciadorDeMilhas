import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClienteService } from '../_services/cliente.service';
import { Cliente } from '../_models/Cliente';
import { BsModalRef, BsModalService, AlertModule, idLocale } from 'ngx-bootstrap';
import { FormGroup, Validators, FormBuilder, Form, FormArray } from '@angular/forms';
import { defineLocale, BsLocaleService, ptBrLocale } from 'ngx-bootstrap';
import { stringify } from 'querystring';
import { ToastrService } from 'ngx-toastr';
import { Email } from '../_models/Email';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { ContaCorrente } from '../_models/ContaCorrente';
import { PontoCartao } from '../_models/PontoCartao';
import { Milha } from '../_models/Milha';
defineLocale('pt-br', ptBrLocale);

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-Clientes',
  templateUrl: './Clientes.component.html',
  styleUrls: ['./Clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];
  cliente: Cliente;
  clientesFiltrados: Cliente[] = [];
  // emails: Email[] = [];
  email: Email;
  registerForm: FormGroup;
  modoSalvar = '';
  formatoModal = '';
  bodyDeletarEvento = '';
  titulo = 'Clientes';
  data: string;

  formulario: any;

  contaCorrente: ContaCorrente;

  pontoCartao: PontoCartao;
  pontosCartao: PontoCartao[] = [];

  milha: Milha;
  milhas: Milha[] = [];

  novaContaCorrente: ContaCorrente = new ContaCorrente; 
  novoPontoCartao: PontoCartao[] = [];
  novaMilha: Milha[] = [];


  // tslint:disable-next-line:variable-name
  _filtroLista = '';

  // constructor(private http: HttpClient){}
  constructor(
    private clienteService: ClienteService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {
    this.localeService.use('pt-br');
  }

  ngOnInit() {
    this.getClientes();
    this.validation();
    document.getElementById('formulario').style.display = 'none';
    document.getElementById('deletar').style.display = 'none';

    const timer = JSON.parse(localStorage.getItem('timer'));

    /*
    if (timer && (Date.now() > timer)) {

      this.authService.loggedOf();
      this.toastr.error('Sessão Encerrada!');
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('timer');
      this.router.navigate(['/user/login']);
    }
    */
  }

  get contaCorrenteForm(): FormGroup {
    return <FormGroup>this.registerForm.get('contaCorrente');
  }

  get pontosCartaoForm(): FormArray {
    return <FormArray>this.registerForm.get('contaCorrente.pontosCartao');
  }

  get milhasForm(): FormArray {
    return <FormArray>this.registerForm.get('contaCorrente.milhas');
  }

  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.clientesFiltrados = this.filtroLista ? this.filtrarClientes(this.filtroLista) : this.clientes;
  }

  getClientes() {
    this.clienteService.getAllClientes()
      .subscribe(
        (users: Cliente[]) => {
          this.clientes = users;
          this.clientesFiltrados = this.clientes;

          /*

          this.contaCorrenteForm.patchValue(this.novaContaCorrente);
          this.pontosCartaoForm.patchValue(this.novoPontoCartao);
          this.milhasForm.patchValue(this.novaMilha);

          */

        }, error => {
          // console.log(error);
        });
  }

  filtrarClientes(filtrarPor: string): Cliente[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.clientes.filter(
      clientes => clientes.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  openModal() {
    this.registerForm.reset();
    this.modoSalvar = 'post';
    this.formatoModal = 'Cadastrar Cliente';
    document.getElementById('formulario').style.display = 'block';
  }

  openModalUpdate(cliente: Cliente) {
    this.registerForm.reset();
    this.formatoModal = 'Atualizar Cliente';
    this.modoSalvar = 'put';
    this.cliente = cliente;
    this.registerForm.patchValue(cliente);
    document.getElementById('deletar').style.display = 'none';
    document.getElementById('formulario').style.display = 'block';
  }

  openModalDelete(cliente: Cliente) {
    document.getElementById('formulario').style.display = 'none';
    document.getElementById('deletar').style.display = 'block';
    this.formatoModal = 'Deletar Cliente';
    this.modoSalvar = 'put';
    this.cliente = cliente;
    this.bodyDeletarEvento = `Tem certeza que deseja excluir o Cliente: ${cliente.nome}, Id: ${cliente.id}`;
  }

  salvarAlteracao(template: any) {
    if (this.registerForm.valid) {

      if (this.modoSalvar === 'post') {

        this.cliente = Object.assign({}, this.registerForm.value);
        this.clienteService.postCliente(this.cliente).subscribe(
          (novoCliente: Cliente) => {
            // this.bodyDeletarEvento = `Tem certeza que deseja excluir o Cliente: ${this.cliente.Nome}, Id: ${this.cliente.Id}`;
            // console.log(novoCliente);
            alert('Cliente Cadastrado');
            this.getClientes();
          }, error => {
            alert('Cliente não Cadastrado');
            console.log(error);
          });
      }

      if (this.modoSalvar === 'put') {

        this.cliente = Object.assign({
          id: this.cliente.id
        }, this.registerForm.value);
        this.clienteService.updateCliente(this.cliente).subscribe(
          (clienteAtualizado: Cliente) => {
            // console.log(clienteAtualizado);
            alert('Cliente Atualizado');
            this.getClientes();
          }, error => {
            // console.log(error);
            alert('Cliente não Atualizado');
          });
      }

    }
    this.getClientes();
    document.getElementById('formulario').style.display = 'none';
    this.registerForm.reset();
  }

  deletarCliente(templateDelete: any) {
    this.clienteService.DeleteCliente(this.cliente).subscribe(
      () => {

        this.toastr.success('Deletado com sucesso', 'Remoção de Cliente');
        this.getClientes();
      }, error => {
        console.log(error);
        this.toastr.error('Erro ao deletar Cliente', 'Remoção de Cliente');
      });

    this.getClientes();
    document.getElementById('deletar').style.display = 'none';
  }

  fecharFormDelete() {
    document.getElementById('deletar').style.display = 'none';
  }

  fecharForm() {
    document.getElementById('formulario').style.display = 'none';
  }

  validation() {
    this.registerForm = this.fb.group({
          nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
          data: ['', Validators.required],
           cpf: ['', Validators.required],
            rg: ['', Validators.required],
      endereco: ['', Validators.required],
        bairro: ['', Validators.required],
        cidade: ['', Validators.required],
        numero: ['', Validators.required],
            uf: ['', Validators.required],
          pais: ['', Validators.required],
   complemento: ['', Validators.required],
         skype: ['', Validators.required],
        status: ['', Validators.required],
/* contaCorrente: this.fb.group({
          id: [],
          pontosCartao: this.fb.array([]),
          milhas: this.fb.array([])
        })
        */
    });
  }

  criaPontoCartao(pontoCartao: any): FormGroup {
    return this.fb.group({
            id: [pontoCartao.id],
          nome: [pontoCartao.nome],
    quantidade: [pontoCartao.quantidade],
          tipo: [pontoCartao.tipo],
         valor: [pontoCartao.valor],
  dataRegistro: [pontoCartao.dataRegistro]
    });
  }

  criaMilha(milha: any): FormGroup {
    return this.fb.group({
            id: [milha.id],
          nome: [milha.nome],
    quantidade: [milha.quantidade],
          tipo: [milha.tipo],
         valor: [milha.valor],
  dataRegistro: [milha.dataRegistro]
    });
  }

}
