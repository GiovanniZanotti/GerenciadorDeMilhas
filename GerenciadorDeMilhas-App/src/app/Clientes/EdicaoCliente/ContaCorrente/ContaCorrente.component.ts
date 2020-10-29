import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/_models/Cliente';
import { ClienteService } from 'src/app/_services/cliente.service';
import { ContaCorrente } from 'src/app/_models/ContaCorrente';
import { PontoCartao } from 'src/app/_models/PontoCartao';
import { Milha } from 'src/app/_models/Milha';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-ContaCorrente',
  templateUrl: './ContaCorrente.component.html',
  styleUrls: ['./ContaCorrente.component.css']
})
export class ContaCorrenteComponent implements OnInit {

  cliente: Cliente;
  idCliente: number;

  idPontosCartao: number;
  idMilhas: number;

  contaCorrente: ContaCorrente;

  pontoCartao: PontoCartao;
  pontosCartao: PontoCartao[] = [];

  milha: Milha;
  milhas: Milha[] = [];

  data:string;
  modoSalvar = 'put';
  registerForm: FormGroup;

  titulo = 'Conta Corrente: ';

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private clienteService: ClienteService) {}

  ngOnInit() {
    this.carregaContaCorrente();
    this.validation();
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

  carregaContaCorrente() {
    
    this.idCliente = +this.route.snapshot.paramMap.get('id');
    this.clienteService.getClienteById(this.idCliente)
      .subscribe(
        (cliente: Cliente) => {
          this.cliente = Object.assign({}, cliente);

          this.registerForm.patchValue(this.cliente);

          this.contaCorrente = this.cliente.contaCorrente;
          this.titulo += this.cliente.nome;

          this.pontosCartao = this.contaCorrente.pontosCartao;
          this.milhas = this.contaCorrente.milhas;

          this.contaCorrenteForm.patchValue(this.cliente.contaCorrente);

          this.cliente.contaCorrente.pontosCartao.forEach(pontoCartao => {
            this.pontosCartaoForm.push(this.criaPontoCartao(pontoCartao));
          });

          this.cliente.contaCorrente.milhas.forEach(milha => {
            this.milhasForm.push(this.criaMilha(milha));
          });

          console.log(this.cliente);
        }
      );
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
      historicos: this.fb.array([]),
   contaCorrente: this.fb.group({
            id: [],
            pontosCartao: this.fb.array([]),
            milhas: this.fb.array([])
          })

    });  
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


  criaPontoCartao(pontoCartao: any): FormGroup {
    return this.fb.group({
            id: [pontoCartao.id],
          nome: [pontoCartao.nome],
    quantidade: [pontoCartao.quantidade],
          tipo: [pontoCartao.tipo],
         valor: [pontoCartao.valor],
  dataRegistro: [pontoCartao.dataRegistro]
    });

    this.seleciona(0, pontoCartao);
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

    this.seleciona(0, milha);
  }

  adicionaPontoCartao() {
    this.pontosCartaoForm.push(this.criaPontoCartao({ id: 0 }));
    this.idPontosCartao = 0;
  }

  adicionarMilha() {
    this.milhasForm.push(this.criaMilha({ id: 0 }));
    this.idMilhas = 0;
  }

  editarPontoCartao(pontoCarto: any) {
    this.idPontosCartao = pontoCarto.value.id;
  }

  editarMilha(milha: any) {
    this.idMilhas = milha.value.id;
  }

  removerPontosCartao(id: number) {
    this.pontosCartaoForm.removeAt(id);
  }

  removerMilhas(id: number) {
    this.milhasForm.removeAt(id);
  }


  seleciona(id: number, tipo: string): boolean {

    switch (tipo) {
      case 'pontoCartao':
        if(id == this.idPontosCartao) {
          return true;
        } else {
          return false;
        }
        break;
      case 'milha':
        if(id == this.idMilhas) {
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