using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class navlinklistingstomessages : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Messages_ListingID",
                table: "Messages",
                column: "ListingID");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_Listings_ListingID",
                table: "Messages",
                column: "ListingID",
                principalTable: "Listings",
                principalColumn: "ListingID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_Listings_ListingID",
                table: "Messages");

            migrationBuilder.DropIndex(
                name: "IX_Messages_ListingID",
                table: "Messages");
        }
    }
}
