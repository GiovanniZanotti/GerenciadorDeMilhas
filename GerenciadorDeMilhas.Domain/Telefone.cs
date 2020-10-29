namespace GerenciadorDeMilhas.Domain
{
    public class Telefone
    {
        public int Id { get; set; }

        public int IdCliente { get; set; }

        public Cliente Cliente { get; }

        public string Numero { get; set; }

        public int DDD { get; set; }

        public int Ramal { get; set; }

        public string Operadora { get; set; }
    }
}