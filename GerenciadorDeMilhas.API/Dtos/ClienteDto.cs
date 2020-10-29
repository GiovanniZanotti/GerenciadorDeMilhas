using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GerenciadorDeMilhas.API.Dtos
{
    public class ClienteDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage="O nome precisa ser preenchido.")]
        [StringLength(100, MinimumLength=1, ErrorMessage="Nome deve ser entre 4 e 100 caracteres")]
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

        public List<EmailDto> Emails { get; set; }

        public List<TelefoneDto> Telefones { get; set; }

        public List<AcessoClienteDto> AcessoClientes { get; set; }

        public List<HistoricoDto> Historicos { get; set; }

        public ContaCorrenteDto ContaCorrente { get; set; }
    }
}