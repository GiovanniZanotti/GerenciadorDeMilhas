using System.Collections.Generic;

namespace GerenciadorDeMilhas.API.Dtos
{
    public class ContaCorrenteDto
    {
        public int Id { get; set; }

        public List<PontoCartaoDto> PontosCartao { get; set; }

        public List<MilhaDto> Milhas { get; set; }

    }
}