namespace GerenciadorDeMilhas.Domain
{
    public class Email
    {
        public int Id { get; set; }

        public int IdCliente { get; set; }

        public Cliente Cliente { get; }

        public string Endereco { get; set; }

        public bool Boleto { get; set; }

        public bool Nota { get; set; }

        public bool Comunicado { get; set; }
    }
}