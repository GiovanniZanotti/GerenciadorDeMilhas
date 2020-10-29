using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace GerenciadorDeMilhas.Repository.Migrations
{
    public partial class adicaoPontoCartao : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Nome",
                table: "ContaCorrente");

            migrationBuilder.CreateTable(
                name: "PontoCartao",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityAlwaysColumn),
                    IdCliente = table.Column<int>(nullable: false),
                    ClienteId = table.Column<int>(nullable: true),
                    Nome = table.Column<string>(nullable: true),
                    Quantidade = table.Column<int>(nullable: false),
                    tipo = table.Column<string>(nullable: true),
                    Valor = table.Column<float>(nullable: false),
                    DataRegistro = table.Column<DateTime>(nullable: false),
                    ContaCorrenteId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PontoCartao", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PontoCartao_Cliente_ClienteId",
                        column: x => x.ClienteId,
                        principalTable: "Cliente",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PontoCartao_ContaCorrente_ContaCorrenteId",
                        column: x => x.ContaCorrenteId,
                        principalTable: "ContaCorrente",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PontoCartao_ClienteId",
                table: "PontoCartao",
                column: "ClienteId");

            migrationBuilder.CreateIndex(
                name: "IX_PontoCartao_ContaCorrenteId",
                table: "PontoCartao",
                column: "ContaCorrenteId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PontoCartao");

            migrationBuilder.AddColumn<string>(
                name: "Nome",
                table: "ContaCorrente",
                nullable: true);
        }
    }
}
