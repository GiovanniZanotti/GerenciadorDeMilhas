using System.Collections.Generic;

namespace GerenciadorDeMilhas.Domain
{
    public class ContaCorrente
    {
        public int Id { get; set; }

        public int IdCliente { get; set; }

        public Cliente Cliente { get; }

        public List<PontoCartao> PontosCartao { get; set; }

        public List<Milha> Milhas { get; set; }
    }
}