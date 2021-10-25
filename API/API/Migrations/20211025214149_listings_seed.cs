using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class listings_seed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Listings",
                columns: new[] { "ListingID", "ListingAvailability", "ListingCategory", "ListingCondition", "ListingDate", "ListingDescription", "ListingImageURL", "ListingPostCode", "ListingPrice", "ListingTitle", "ListingType", "UserID" },
                values: new object[,]
                {
                    { 1001, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Test Products", "Good", new DateTime(2021, 10, 25, 21, 41, 49, 477, DateTimeKind.Utc).AddTicks(9308), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", "https://picsum.photos/100?random=1", 2650, 1.00m, "Test Product 1", "Product", 1 },
                    { 1002, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Test Products", "Great", new DateTime(2021, 10, 25, 21, 41, 49, 478, DateTimeKind.Utc).AddTicks(915), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", "https://picsum.photos/100?random=2", 4000, 2.00m, "Test Product 2", "Product", 1 },
                    { 1003, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Test Products", "Needs Repair", new DateTime(2021, 10, 25, 21, 41, 49, 478, DateTimeKind.Utc).AddTicks(918), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", "https://picsum.photos/100?random=3", 2222, 3.00m, "Test Product 3", "Product", 1 },
                    { 1004, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Test Products", "Fair", new DateTime(2021, 10, 25, 21, 41, 49, 478, DateTimeKind.Utc).AddTicks(920), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", "https://picsum.photos/100?random=4", 3232, 4.44m, "Test Product 4", "Product", 1 },
                    { 1005, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Test Products", "Excellent", new DateTime(2021, 10, 25, 21, 41, 49, 478, DateTimeKind.Utc).AddTicks(921), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", "https://picsum.photos/100?random=5", 4154, 5.0m, "Test Product 5", "Product", 1 },
                    { 1006, new DateTime(2021, 10, 25, 21, 41, 49, 478, DateTimeKind.Utc).AddTicks(922), "Test Services", null, new DateTime(2021, 10, 25, 21, 41, 49, 478, DateTimeKind.Utc).AddTicks(922), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", "https://picsum.photos/100?random=1", 4000, 6.0m, "Test Service 1", "Service", 1 },
                    { 1007, new DateTime(2021, 10, 25, 21, 41, 49, 478, DateTimeKind.Utc).AddTicks(1161), "Test Services", null, new DateTime(2021, 10, 25, 21, 41, 49, 478, DateTimeKind.Utc).AddTicks(1160), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", "https://picsum.photos/100?random=2", 3456, 7.0m, "Test Service 2", "Service", 1 },
                    { 1008, new DateTime(2021, 10, 25, 21, 41, 49, 478, DateTimeKind.Utc).AddTicks(1162), "Test Services", null, new DateTime(2021, 10, 25, 21, 41, 49, 478, DateTimeKind.Utc).AddTicks(1162), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", "https://picsum.photos/100?random=3", 2560, 8.89m, "Test Service 3", "Service", 1 },
                    { 1009, new DateTime(2021, 10, 25, 21, 41, 49, 478, DateTimeKind.Utc).AddTicks(1164), "Test Services", null, new DateTime(2021, 10, 25, 21, 41, 49, 478, DateTimeKind.Utc).AddTicks(1163), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", "https://picsum.photos/100?random=4", 3000, 8.89m, "Test Service 4", "Service", 1 },
                    { 1010, new DateTime(2021, 10, 25, 21, 41, 49, 478, DateTimeKind.Utc).AddTicks(1165), "Test Services", null, new DateTime(2021, 10, 25, 21, 41, 49, 478, DateTimeKind.Utc).AddTicks(1165), "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", "https://picsum.photos/100?random=5", 4000, 10.99m, "Test Service 5", "Service", 1 }
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
