using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class removelistingsimages : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ListingImageURL",
                table: "Listings");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ListingImageURL",
                table: "Listings",
                type: "text",
                nullable: true);
        }
    }
}
