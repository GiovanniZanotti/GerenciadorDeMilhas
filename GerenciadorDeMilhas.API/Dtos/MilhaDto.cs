using System;

namespace GerenciadorDeMilhas.API.Dtos
{
    public class MilhaDto
    {
        public int Id { get; set; }

        public string Nome { get; set; }

        public int Quantidade { get; set; }

        public string Tipo { get; set; }

        public float Valor { get; set; }

        public DateTime DataRegistro { get; set; }
    }
}