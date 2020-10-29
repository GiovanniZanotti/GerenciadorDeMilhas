namespace GerenciadorDeMilhas.Domain
{
    public class AcessoCliente
    {

        public int Id { get; set; }

        public string Login { get; set; }

        public string Senha { get; set; }

        public string Observacoes { get; set; }

        public int IdCliente { get; set; }

        public Cliente Cliente { get; }
    }
}