using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace GerenciadorDeMilhas.Repository.Migrations
{
    public partial class adicaoContaCorrente : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ContaCorrenteId",
                table: "Cliente",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ContaCorrente",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityAlwaysColumn),
                    IdCliente = table.Column<int>(nullable: false),
                    Nome = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContaCorrente", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cliente_ContaCorrenteId",
                table: "Cliente",
                column: "ContaCorrenteId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cliente_ContaCorrente_ContaCorrenteId",
                table: "Cliente",
                column: "ContaCorrenteId",
                principalTable: "ContaCorrente",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cliente_ContaCorrente_ContaCorrenteId",
                table: "Cliente");

            migrationBuilder.DropTable(
                name: "ContaCorrente");

            migrationBuilder.DropIndex(
                name: "IX_Cliente_ContaCorrenteId",
                table: "Cliente");

            migrationBuilder.DropColumn(
                name: "ContaCorrenteId",
                table: "Cliente");
        }
    }
}
