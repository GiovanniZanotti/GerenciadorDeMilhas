using System;

namespace GerenciadorDeMilhas.Domain
{
    public class PontoCartao
    {
        public int Id { get; set; }

        public int IdCliente { get; set; }

        public Cliente Cliente { get; set; }

        public string Nome { get; set; }

        public int Quantidade { get; set; }

        public string tipo { get; set; }

        public float Valor { get; set; }

        public DateTime DataRegistro { get; set; }
    }
}