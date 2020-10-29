using System;

namespace GerenciadorDeMilhas.API.Dtos
{
    public class HistoricoDto
    {
        public int Id { get; set; }

        public string Assunto { get; set; }

        public string Descricao { get; set; }

        public DateTime Data { get; set; }
    }
}