using Microsoft.EntityFrameworkCore.Migrations;

namespace GerenciadorDeMilhas.Repository.Migrations
{
    public partial class clienteatualizado : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Idade",
                table: "Cliente");

            migrationBuilder.RenameColumn(
                name: "Senha",
                table: "Cliente",
                newName: "UF");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Cliente",
                newName: "Skype");

            migrationBuilder.AddColumn<string>(
                name: "Bairro",
                table: "Cliente",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CPF",
                table: "Cliente",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Cidade",
                table: "Cliente",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Complemento",
                table: "Cliente",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Endereco",
                table: "Cliente",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Numero",
                table: "Cliente",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Pais",
                table: "Cliente",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RG",
                table: "Cliente",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Status",
                table: "Cliente",
                nullable: true,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Bairro",
                table: "Cliente");

            migrationBuilder.DropColumn(
                name: "CPF",
                table: "Cliente");

            migrationBuilder.DropColumn(
                name: "Cidade",
                table: "Cliente");

            migrationBuilder.DropColumn(
                name: "Complemento",
                table: "Cliente");

            migrationBuilder.DropColumn(
                name: "Endereco",
                table: "Cliente");

            migrationBuilder.DropColumn(
                name: "Numero",
                table: "Cliente");

            migrationBuilder.DropColumn(
                name: "Pais",
                table: "Cliente");

            migrationBuilder.DropColumn(
                name: "RG",
                table: "Cliente");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Cliente");

            migrationBuilder.RenameColumn(
                name: "UF",
                table: "Cliente",
                newName: "Senha");

            migrationBuilder.RenameColumn(
                name: "Skype",
                table: "Cliente",
                newName: "Email");

            migrationBuilder.AddColumn<int>(
                name: "Idade",
                table: "Cliente",
                nullable: false,
                defaultValue: 0);
        }
    }
}
