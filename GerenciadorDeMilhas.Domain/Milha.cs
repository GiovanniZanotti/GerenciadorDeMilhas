using System;

namespace GerenciadorDeMilhas.Domain
{
    public class Milha
    {
        public int Id { get; set; }

        public int IdCliente { get; set; }

        public Cliente Cliente { get; }

        public string Nome { get; set; }

        public int Quantidade { get; set; }

        public string Tipo { get; set; }

        public float Valor { get; set; }

        public DateTime DataRegistro { get; set; }
    }
}