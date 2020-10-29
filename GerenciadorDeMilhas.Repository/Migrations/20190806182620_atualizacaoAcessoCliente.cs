using Microsoft.EntityFrameworkCore.Migrations;

namespace GerenciadorDeMilhas.Repository.Migrations
{
    public partial class atualizacaoAcessoCliente : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SenhaCliente",
                table: "AcessoCliente",
                newName: "Observacoes");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Observacoes",
                table: "AcessoCliente",
                newName: "SenhaCliente");
        }
    }
}
