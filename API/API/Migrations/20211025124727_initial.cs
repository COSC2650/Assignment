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
                    UserEmailVerfied = table.Column<bool>(type: "tinyint(1)", nullable: false),
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

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserID", "RoleID", "UserCity", "UserEmail", "UserEmailVerfied", "UserFirstName", "UserLastName", "UserPasswordHash", "UserPostCode", "UserState", "UserStreet" },
                values: new object[] { 1, 2, "City", "not@real.com", false, "Test", "Account", "50000:8q+Oc/+2RcPpp3fH6b4ugc18mui+ZCTi:kSUzflp66KeT6+TZZdoNrg7fp+E=", 4000, "XXX", "Street" });

            migrationBuilder.InsertData(
                table: "Listings",
                columns: new[] { "ListingID", "ListingAvailability", "ListingCategory", "ListingCondition", "ListingDate", "ListingDescription", "ListingImageURL", "ListingPostCode", "ListingPrice", "ListingTitle", "ListingType", "UserID" },
                values: new object[,]
                {
                    { 1001, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Test Products", "Good", new DateTime(2021, 10, 25, 12, 47, 27, 381, DateTimeKind.Utc).AddTicks(9230), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", "https://picsum.photos/100?random=1", 2650, 1.00m, "Test Product 1", "Product", 1 },
                    { 1002, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Test Products", "Great", new DateTime(2021, 10, 25, 12, 47, 27, 382, DateTimeKind.Utc).AddTicks(825), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", "https://picsum.photos/100?random=2", 4000, 2.00m, "Test Product 2", "Product", 1 },
                    { 1003, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Test Products", "Needs Repair", new DateTime(2021, 10, 25, 12, 47, 27, 382, DateTimeKind.Utc).AddTicks(828), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", "https://picsum.photos/100?random=3", 2222, 3.00m, "Test Product 3", "Product", 1 },
                    { 1004, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Test Products", "Fair", new DateTime(2021, 10, 25, 12, 47, 27, 382, DateTimeKind.Utc).AddTicks(830), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", "https://picsum.photos/100?random=4", 3232, 4.44m, "Test Product 4", "Product", 1 },
                    { 1005, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Test Products", "Excellent", new DateTime(2021, 10, 25, 12, 47, 27, 382, DateTimeKind.Utc).AddTicks(831), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", "https://picsum.photos/100?random=5", 4154, 5.0m, "Test Product 5", "Product", 1 },
                    { 1006, new DateTime(2021, 10, 25, 12, 47, 27, 382, DateTimeKind.Utc).AddTicks(832), "Test Services", null, new DateTime(2021, 10, 25, 12, 47, 27, 382, DateTimeKind.Utc).AddTicks(832), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", "https://picsum.photos/100?random=1", 4000, 6.0m, "Test Service 1", "Service", 1 },
                    { 1007, new DateTime(2021, 10, 25, 12, 47, 27, 382, DateTimeKind.Utc).AddTicks(1072), "Test Services", null, new DateTime(2021, 10, 25, 12, 47, 27, 382, DateTimeKind.Utc).AddTicks(1071), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", "https://picsum.photos/100?random=2", 3456, 7.0m, "Test Service 2", "Service", 1 },
                    { 1008, new DateTime(2021, 10, 25, 12, 47, 27, 382, DateTimeKind.Utc).AddTicks(1073), "Test Services", null, new DateTime(2021, 10, 25, 12, 47, 27, 382, DateTimeKind.Utc).AddTicks(1073), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", "https://picsum.photos/100?random=3", 2560, 8.89m, "Test Service 3", "Service", 1 },
                    { 1009, new DateTime(2021, 10, 25, 12, 47, 27, 382, DateTimeKind.Utc).AddTicks(1074), "Test Services", null, new DateTime(2021, 10, 25, 12, 47, 27, 382, DateTimeKind.Utc).AddTicks(1074), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", "https://picsum.photos/100?random=4", 3000, 8.89m, "Test Service 4", "Service", 1 },
                    { 1010, new DateTime(2021, 10, 25, 12, 47, 27, 382, DateTimeKind.Utc).AddTicks(1076), "Test Services", null, new DateTime(2021, 10, 25, 12, 47, 27, 382, DateTimeKind.Utc).AddTicks(1076), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", "https://picsum.photos/100?random=5", 4000, 10.99m, "Test Service 5", "Service", 1 }
                });

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
