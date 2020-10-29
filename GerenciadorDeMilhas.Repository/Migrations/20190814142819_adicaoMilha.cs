using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace GerenciadorDeMilhas.Repository.Migrations
{
    public partial class adicaoMilha : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Milha",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityAlwaysColumn),
                    IdCliente = table.Column<int>(nullable: false),
                    Nome = table.Column<string>(nullable: true),
                    Quantidade = table.Column<int>(nullable: false),
                    Tipo = table.Column<string>(nullable: true),
                    DataRegistro = table.Column<DateTime>(nullable: false),
                    ContaCorrenteId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Milha", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Milha_ContaCorrente_ContaCorrenteId",
                        column: x => x.ContaCorrenteId,
                        principalTable: "ContaCorrente",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Milha_ContaCorrenteId",
                table: "Milha",
                column: "ContaCorrenteId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Milha");
        }
    }
}
