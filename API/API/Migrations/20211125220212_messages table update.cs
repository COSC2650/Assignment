using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class messagestableupdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SenderEmail",
                table: "Messages",
                type: "text",
                nullable: false);

            migrationBuilder.AddColumn<string>(
                name: "SenderFirstName",
                table: "Messages",
                type: "text",
                nullable: false);

            migrationBuilder.AddColumn<string>(
                name: "SenderLastName",
                table: "Messages",
                type: "text",
                nullable: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SenderEmail",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "SenderFirstName",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "SenderLastName",
                table: "Messages");
        }
    }
}
