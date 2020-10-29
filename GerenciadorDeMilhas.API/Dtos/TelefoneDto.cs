namespace GerenciadorDeMilhas.API.Dtos
{
    public class TelefoneDto
    {
        public int Id { get; set; }

        public string Numero { get; set; }

        public int DDD { get; set; }

        public int Ramal { get; set; }

        public string Operadora { get; set; }
    }
}