using Microsoft.EntityFrameworkCore.Migrations;

namespace GerenciadorDeMilhas.Repository.Migrations
{
    public partial class correcaoMilha : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "Valor",
                table: "Milha",
                nullable: false,
                defaultValue: 0f);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Valor",
                table: "Milha");
        }
    }
}
