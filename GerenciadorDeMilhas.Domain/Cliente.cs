using System;
using System.Collections.Generic;

namespace GerenciadorDeMilhas.Domain
{
    public class Cliente
    {
        public int Id { get; set; }
        public string Nome { get; set; }

        public DateTime Data { get; set; }

        public string CPF { get; set; }

        public string RG { get; set; }

        public string Endereco { get; set; }

        public string Bairro { get; set; }

        public string Cidade { get; set; }

        public string Numero { get; set; }
        
        public string UF { get; set; }

        public string Pais { get; set; }
        
        public string Complemento { get; set; }

        public string Skype { get; set; }

        public bool Status { get; set; }

        public List<Email> Emails { get; set; }
        
        public List<Telefone> Telefones { get; set; }

        public List<AcessoCliente> AcessoClientes { get; set; }

        public List<Historico> Historicos { get; set; }

        public ContaCorrente ContaCorrente { get; set; }
    }
}
