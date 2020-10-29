using System;

namespace GerenciadorDeMilhas.Domain
{
    public class Historico
    {
        public int Id { get; set; }

        public int IdCliente { get; set; }

        public Cliente Cliente { get; }

        public string Assunto { get; set; }

        public string Descricao { get; set; }

        public DateTime Data { get; set; }
    }
}