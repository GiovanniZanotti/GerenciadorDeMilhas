import { Email } from './Email';
import { Telefone } from './Telefone';
import { AcessoCliente } from './AcessoCliente';
import { Historico } from './Historico';
import { ContaCorrente } from './ContaCorrente';

export interface Cliente {

    id: number;

    nome: string;

    data: Date;

    cpf: string;

    rg: string;

    endereco: string;

    bairro: string;

    cidade: string;

    numero: string;

    uf: string;

    pais: string;

    complemento: string;

    skype: string;

    status: boolean;

    emails: Email[];

    telefones: Telefone[];

    acessoClientes: AcessoCliente[];

    historicos: Historico[];

    contaCorrente: ContaCorrente;
}
