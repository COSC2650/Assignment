using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class refactoruser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserID",
                keyValue: 1);

            migrationBuilder.DropColumn(
                name: "PasswordSalt",
                table: "Users");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PasswordSalt",
                table: "Users",
                type: "text",
                nullable: false);

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserID", "City", "Email", "EmailVerfied", "FirstName", "LastName", "PasswordHash", "PasswordSalt", "PostCode", "State", "Street" },
                values: new object[] { 1, "Fakesvile", "not@real.com", true, "Bob", "Peterson", "", "", 4114, "QLD", "82 Fake St" });
        }
    }
}
