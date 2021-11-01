using System;
using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

namespace API.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ConfirmCodes",
                columns: table => new
                {
                    Email = table.Column<string>(type: "varchar(767)", nullable: false),
                    Code = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConfirmCodes", x => x.Email);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    RoleID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    RoleName = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.RoleID);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    UserFirstName = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    UserLastName = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    UserStreet = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    UserCity = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    UserState = table.Column<string>(type: "varchar(3)", maxLength: 3, nullable: false),
                    UserPostCode = table.Column<int>(type: "int", maxLength: 4, nullable: false),
                    UserEmail = table.Column<string>(type: "varchar(767)", nullable: false),
                    UserPasswordHash = table.Column<string>(type: "text", nullable: false),
                    UserEmailVerified = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    RoleID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserID);
                    table.ForeignKey(
                        name: "FK_Users_Roles_RoleID",
                        column: x => x.RoleID,
                        principalTable: "Roles",
                        principalColumn: "RoleID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Listings",
                columns: table => new
                {
                    ListingID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    UserID = table.Column<int>(type: "int", nullable: false),
                    ListingPostCode = table.Column<int>(type: "int", maxLength: 4, nullable: false),
                    ListingTitle = table.Column<string>(type: "text", nullable: false),
                    ListingDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    ListingCategory = table.Column<string>(type: "text", nullable: false),
                    ListingPrice = table.Column<decimal>(type: "decimal(18, 2)", nullable: false),
                    ListingType = table.Column<string>(type: "text", nullable: false),
                    ListingDescription = table.Column<string>(type: "text", nullable: false),
                    ListingCondition = table.Column<string>(type: "text", nullable: true),
                    ListingAvailability = table.Column<DateTime>(type: "datetime", nullable: false),
                    ListingImageURL = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Listings", x => x.ListingID);
                    table.ForeignKey(
                        name: "FK_Listings_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "RoleID", "RoleName" },
                values: new object[] { 1, "Admin" });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "RoleID", "RoleName" },
                values: new object[] { 2, "User" });

            migrationBuilder.CreateIndex(
                name: "IX_Listings_UserID",
                table: "Listings",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_Users_RoleID",
                table: "Users",
                column: "RoleID");

            migrationBuilder.CreateIndex(
                name: "IX_Users_UserEmail",
                table: "Users",
                column: "UserEmail",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ConfirmCodes");

            migrationBuilder.DropTable(
                name: "Listings");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Roles");
        }
    }
}
