import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, Form, FormArray, FormControl, FormGroupDirective, FormControlName, ControlContainer } from '@angular/forms';
import { Email } from 'src/app/_models/Email';
import { Cliente } from 'src/app/_models/Cliente';
import { ClienteService } from 'src/app/_services/cliente.service';
import { BsLocaleService, TabHeadingDirective } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Telefone } from 'src/app/_models/Telefone';
import { AcessoCliente } from 'src/app/_models/AcessoCliente';
import { Historico } from 'src/app/_models/Historico';
import { ContaCorrente } from 'src/app/_models/ContaCorrente';

@Component({
  selector: 'app-edicao-cliente',
  templateUrl: './EdicaoCliente.component.html',
  styleUrls: ['./EdicaoCliente.component.css']
})
export class EdicaoClienteComponent implements OnInit {

  cliente: Cliente;
  clientes: Cliente[] = [];
  idCliente: number;


  email: Email;
  emails: Email[] = [];

  telefone: Telefone;
  telefones: Telefone[] = [];

  acessoCliente: AcessoCliente;
  acessoClientes: AcessoCliente[] = [];

  historico: Historico;
  historicos: Historico[] = [];

  contaCorrente: ContaCorrente;

  clientesFiltrados: Cliente[] = [];
  registerForm: FormGroup;
  modoSalvar = 'put';
  titulo = '';
  data: string;
  dataHistorico: string;

  idEmail: number;
  idTelefone: number;
  idAcessoCliente: number;
  idHistorico: number;

  // tslint:disable-next-line:variable-name
  _filtroLista = '';


  // constructor(private http: HttpClient){}
  constructor(
    private clienteService: ClienteService,
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.localeService.use('pt-br');
  }

  get telefonesForm(): FormArray {
    return <FormArray>this.registerForm.get('telefones');
  }

  get emailsForm(): FormArray {
    return <FormArray>this.registerForm.get('emails');
  }

  get acessoClientesForm(): FormArray {
    return <FormArray>this.registerForm.get('acessoClientes');
  }

  get historicosForm(): FormArray {
    return <FormArray>this.registerForm.get('historicos');
  }

  ngOnInit() {
    this.validation();
    // this.validationEmail();
    // this.getClientes();
    this.carregaCliente();
    //document.getElementById('formulario').style.display = 'block';
    //document.getElementById('deletar').style.display = 'none';
  }

  carregaCliente() {
    // this.route... retorna uma string, o + antes converte para number;
    this.idCliente = +this.route.snapshot.paramMap.get('id');
    this.clienteService.getClienteById(this.idCliente)
      .subscribe(
        (cliente: Cliente) => {
          this.cliente = Object.assign({}, cliente);
          this.emails = this.cliente.emails;
          this.telefones = this.cliente.telefones;
          this.acessoClientes = this.cliente.acessoClientes;
          this.historicos = this.cliente.historicos;
          this.registerForm.patchValue(this.cliente);
          this.titulo = this.cliente.nome;
          console.log(this.cliente);

          if(this.cliente.contaCorrente != null) {
            this.contaCorrente = this.cliente.contaCorrente;
          }

          this.cliente.emails.forEach(email => {
              this.emailsForm.push(this.criaEmail(email));
          });

          this.cliente.telefones.forEach(telefone => {
            this.telefonesForm.push(this.criaTelefone(telefone));
          });

          this.cliente.acessoClientes.forEach(acessoCliente => {
            this.acessoClientesForm.push(this.criaAcessoCliente(acessoCliente));
          });

          this.cliente.historicos.forEach(historico => {
            this.historicosForm.push(this.criaHistorico(historico));
          });

          // console.log(this.cliente);
        }
      );

  }

  getClientes() {
    this.clienteService.getAllClientes()
      .subscribe(
        (users: Cliente[]) => {
          this.clientes = users;
          this.clientesFiltrados = this.clientes;
          this.emails = this.clientes[0].emails;
          this.telefones = this.clientes[0].telefones;
          this.acessoClientes = this.clientes[0].acessoClientes;
          this.historicos = this.clientes[0].historicos;
          // console.log(this.emails);
          // console.log(this.clientes);
        }, error => {
          // console.log(error);
        });
  }

  openModalUpdate(email: Email) {
    this.email = email;
  }

  salvarAlteracao(template: any) {
    if (this.registerForm.valid) {

      if (this.modoSalvar === 'put') {

        this.cliente = Object.assign({
          id: this.cliente.id
        }, this.registerForm.value);


        this.clienteService.updateCliente(this.cliente).subscribe(
          (clienteAtualizado: Cliente) => {
            console.log(clienteAtualizado);
            alert('Cliente Atualizado');
            // this.getClientes();
          }, error => {
            // console.log(error);
            alert('Cliente não Atualizado');
          });
      }
    }
    else {
      console.log('Erro');
    }
  }

  openModalDelete(email: Email) {
    this.email = email;
  }

  validation() {
    this.registerForm = this.fb.group({
              id: [],
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
          emails: this.fb.array([]),
       telefones: this.fb.array([]),
  acessoClientes: this.fb.array([]),
      historicos: this.fb.array([])
    });  
  }

  criaEmail(email: any): FormGroup {
    return this.fb.group({
            id: [email.id],
      endereco: [email.endereco, [Validators.required, Validators.email]],
        boleto: [email.boleto, Validators.required],
          nota: [email.nota, Validators.required],
    comunicado: [email.comunicado, Validators.required]
    });

    this.seleciona(0,email);
  }

  criaTelefone(telefone: any): FormGroup {
    return this.fb.group({
          id: [telefone.id],
      numero: [telefone.numero, Validators.required],
         ddd: [telefone.ddd, Validators.required],
       ramal: [telefone.ramal, Validators.required],
   operadora: [telefone.operadora, Validators.required],
    });

    this.seleciona(0,telefone);
  }

  criaAcessoCliente(acessoCliente: any): FormGroup {
    return this.fb.group({
          id: [acessoCliente.id],
       login: [acessoCliente.login, Validators.required],
       senha: [acessoCliente.senha, Validators.required],
 observacoes: [acessoCliente.observacoes, Validators.required]
    });

    this.seleciona(0,acessoCliente);
  }

  criaHistorico(historico: any): FormGroup {
    return this.fb.group({
          id: [historico.id],
     assunto: [historico.assunto, Validators.required],
   descricao: [historico.descricao, Validators.required],
        data: [historico.data, Validators.required]
    });

    this.seleciona(0,historico);
  }

  adicionarEmail() {
    this.emailsForm.push(this.criaEmail({ id: 0 }));
    this.idEmail = 0;
  }

  adicionarTelefone() {
    this.telefonesForm.push(this.criaTelefone({ id: 0 }));
    this.idTelefone = 0;
  }

  adicionarAcessoCliente() {
    this.acessoClientesForm.push(this.criaAcessoCliente({ id: 0 }));
    this.idAcessoCliente = 0;
  }

  adicionarHistorico() {
    this.historicosForm.push(this.criaHistorico({ id: 0 }));
    this.idHistorico = 0;
  }

  editarEmail(email: any) {
    this.idEmail = email.value.id;
  }

  editarTelefone(telefone: any) {
    this.idTelefone = telefone.value.id;
  }

  editarAcessoCliente(acessoCliente: any) {
    this.idAcessoCliente = acessoCliente.value.id;
  }

  editarHistorico(historico: any) {
    this.idHistorico = historico.value.id;
  }

  removerEmails(id: number) {
    this.emailsForm.removeAt(id);
  }

  removerTelefones(id: number) {
    this.telefonesForm.removeAt(id);
  }

  removerAcessoCliente(id: number) {
    this.acessoClientesForm.removeAt(id);
  }

  removerHistorico(id: number) {
    this.historicosForm.removeAt(id);
  }

  seleciona(id: number, tipo: string): boolean {

    switch (tipo) {
      case 'telefone':
        if(id == this.idTelefone) {
          return true;
        } else {
          return false;
        }
        break;
      case 'email':
        if(id == this.idEmail) {
          return true;
        } else {
          return false;
        }
        break;
      case 'acessoCliente':
        if(id == this.idAcessoCliente) {
          return true;
        } else {
          return false;
        }
        break;
      case 'historico':
        if(id == this.idHistorico) {
          return true;
        } else {
          return false;
        }
        break;
    
      default:
        break;
    }
  }
}
