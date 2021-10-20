using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class test_listings_seed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Listings",
                columns: new[] { "ListingID", "Category", "DateListed", "Description", "ListingType", "PostCode", "Price", "ProdCondition", "ServAvailability", "Title", "UserID" },
                values: new object[,]
                {
                    { 1001, "Test Products", new DateTime(2021, 10, 20, 12, 2, 7, 519, DateTimeKind.Utc).AddTicks(581), "This is a test description for a test product 1.", "Product", 2650, 1.00m, "Good", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Test Product 1", 1 },
                    { 1002, "Test Products", new DateTime(2021, 10, 20, 12, 2, 7, 519, DateTimeKind.Utc).AddTicks(2165), "This is a test description for a test product 2.", "Product", 4000, 2.00m, "Fair", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Test Product 2", 1 },
                    { 1003, "Test Products", new DateTime(2021, 10, 20, 12, 2, 7, 519, DateTimeKind.Utc).AddTicks(2168), "This is a test description for test product 3.", "Product", 2222, 3.00m, "Needs Repair", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Test Product 3", 3 },
                    { 1004, "Test Products", new DateTime(2021, 10, 20, 12, 2, 7, 519, DateTimeKind.Utc).AddTicks(2169), "This is a test description for a test product 4.", "Product", 3232, 4.44m, "Fair", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Test Product 4", 3 },
                    { 1005, "Test Products", new DateTime(2021, 10, 20, 12, 2, 7, 519, DateTimeKind.Utc).AddTicks(2170), "This is a test description for a test product 5.", "Product", 4154, 5.0m, "Excellent", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Test Product 5", 3 },
                    { 1006, "Test Services", new DateTime(2021, 10, 20, 12, 2, 7, 519, DateTimeKind.Utc).AddTicks(2171), "This is a test description for a test service 1.", "Service", 4000, 6.0m, null, new DateTime(2021, 10, 20, 12, 2, 7, 519, DateTimeKind.Utc).AddTicks(2171), "Test Service 1", 1 },
                    { 1007, "Test Services", new DateTime(2021, 10, 20, 12, 2, 7, 519, DateTimeKind.Utc).AddTicks(2427), "This is a test description for a test service 2.", "Service", 3456, 7.0m, null, new DateTime(2021, 10, 20, 12, 2, 7, 519, DateTimeKind.Utc).AddTicks(2427), "Test Service 2", 1 },
                    { 1008, "Test Services", new DateTime(2021, 10, 20, 12, 2, 7, 519, DateTimeKind.Utc).AddTicks(2428), "This is a test description for a test service 3.", "Service", 2560, 8.89m, null, new DateTime(2021, 10, 20, 12, 2, 7, 519, DateTimeKind.Utc).AddTicks(2428), "Test Service 3", 1 },
                    { 1009, "Test Services", new DateTime(2021, 10, 20, 12, 2, 7, 519, DateTimeKind.Utc).AddTicks(2429), "This is a test description for a test service 4.", "Service", 3000, 8.89m, null, new DateTime(2021, 10, 20, 12, 2, 7, 519, DateTimeKind.Utc).AddTicks(2430), "Test Service 4", 3 },
                    { 1010, "Test Services", new DateTime(2021, 10, 20, 12, 2, 7, 519, DateTimeKind.Utc).AddTicks(2431), "This is a test description for a test service 5.", "Service", 4000, 10.99m, null, new DateTime(2021, 10, 20, 12, 2, 7, 519, DateTimeKind.Utc).AddTicks(2431), "Test Service 5", 3 }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Listings",
                keyColumn: "ListingID",
                keyValue: 1001);

            migrationBuilder.DeleteData(
                table: "Listings",
                keyColumn: "ListingID",
                keyValue: 1002);

            migrationBuilder.DeleteData(
                table: "Listings",
                keyColumn: "ListingID",
                keyValue: 1003);

            migrationBuilder.DeleteData(
                table: "Listings",
                keyColumn: "ListingID",
                keyValue: 1004);

            migrationBuilder.DeleteData(
                table: "Listings",
                keyColumn: "ListingID",
                keyValue: 1005);

            migrationBuilder.DeleteData(
                table: "Listings",
                keyColumn: "ListingID",
                keyValue: 1006);

            migrationBuilder.DeleteData(
                table: "Listings",
                keyColumn: "ListingID",
                keyValue: 1007);

            migrationBuilder.DeleteData(
                table: "Listings",
                keyColumn: "ListingID",
                keyValue: 1008);

            migrationBuilder.DeleteData(
                table: "Listings",
                keyColumn: "ListingID",
                keyValue: 1009);

            migrationBuilder.DeleteData(
                table: "Listings",
                keyColumn: "ListingID",
                keyValue: 1010);
        }
    }
}
