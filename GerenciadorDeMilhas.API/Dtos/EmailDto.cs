namespace GerenciadorDeMilhas.API.Dtos
{
    public class EmailDto
    {
        public int Id { get; set; }

        public string Endereco { get; set; }

        public bool Boleto { get; set; }

        public bool Nota { get; set; }

        public bool Comunicado { get; set; }
    }
}