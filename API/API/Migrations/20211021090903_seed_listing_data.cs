using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class seed_listing_data : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageURL",
                table: "Listings",
                type: "text",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Listings",
                keyColumn: "ListingID",
                keyValue: 1001,
                columns: new[] { "DateListed", "ImageURL" },
                values: new object[] { new DateTime(2021, 10, 21, 9, 9, 3, 48, DateTimeKind.Utc).AddTicks(7460), "https://picsum.photos/100?random=1" });

            migrationBuilder.UpdateData(
                table: "Listings",
                keyColumn: "ListingID",
                keyValue: 1002,
                columns: new[] { "DateListed", "ImageURL" },
                values: new object[] { new DateTime(2021, 10, 21, 9, 9, 3, 49, DateTimeKind.Utc).AddTicks(1112), "https://picsum.photos/100?random=2" });

            migrationBuilder.UpdateData(
                table: "Listings",
                keyColumn: "ListingID",
                keyValue: 1003,
                columns: new[] { "DateListed", "ImageURL" },
                values: new object[] { new DateTime(2021, 10, 21, 9, 9, 3, 49, DateTimeKind.Utc).AddTicks(1117), "https://picsum.photos/100?random=3" });

            migrationBuilder.UpdateData(
                table: "Listings",
                keyColumn: "ListingID",
                keyValue: 1004,
                columns: new[] { "DateListed", "ImageURL" },
                values: new object[] { new DateTime(2021, 10, 21, 9, 9, 3, 49, DateTimeKind.Utc).AddTicks(1120), "https://picsum.photos/100?random=4" });

            migrationBuilder.UpdateData(
                table: "Listings",
                keyColumn: "ListingID",
                keyValue: 1005,
                columns: new[] { "DateListed", "ImageURL" },
                values: new object[] { new DateTime(2021, 10, 21, 9, 9, 3, 49, DateTimeKind.Utc).AddTicks(1122), "https://picsum.photos/100?random=5" });

            migrationBuilder.UpdateData(
                table: "Listings",
                keyColumn: "ListingID",
                keyValue: 1006,
                columns: new[] { "DateListed", "ImageURL", "ServAvailability" },
                values: new object[] { new DateTime(2021, 10, 21, 9, 9, 3, 49, DateTimeKind.Utc).AddTicks(1124), "https://picsum.photos/100?random=1", new DateTime(2021, 10, 21, 9, 9, 3, 49, DateTimeKind.Utc).AddTicks(1124) });

            migrationBuilder.UpdateData(
                table: "Listings",
                keyColumn: "ListingID",
                keyValue: 1007,
                columns: new[] { "DateListed", "ImageURL", "ServAvailability" },
                values: new object[] { new DateTime(2021, 10, 21, 9, 9, 3, 49, DateTimeKind.Utc).AddTicks(1717), "https://picsum.photos/100?random=2", new DateTime(2021, 10, 21, 9, 9, 3, 49, DateTimeKind.Utc).AddTicks(1718) });

            migrationBuilder.UpdateData(
                table: "Listings",
                keyColumn: "ListingID",
                keyValue: 1008,
                columns: new[] { "DateListed", "ImageURL", "ServAvailability" },
                values: new object[] { new DateTime(2021, 10, 21, 9, 9, 3, 49, DateTimeKind.Utc).AddTicks(1720), "https://picsum.photos/100?random=3", new DateTime(2021, 10, 21, 9, 9, 3, 49, DateTimeKind.Utc).AddTicks(1720) });

            migrationBuilder.UpdateData(
                table: "Listings",
                keyColumn: "ListingID",
                keyValue: 1009,
                columns: new[] { "DateListed", "ImageURL", "ServAvailability" },
                values: new object[] { new DateTime(2021, 10, 21, 9, 9, 3, 49, DateTimeKind.Utc).AddTicks(1722), "https://picsum.photos/100?random=4", new DateTime(2021, 10, 21, 9, 9, 3, 49, DateTimeKind.Utc).AddTicks(1722) });

            migrationBuilder.UpdateData(
                table: "Listings",
                keyColumn: "ListingID",
                keyValue: 1010,
                columns: new[] { "DateListed", "ImageURL", "ServAvailability" },
                values: new object[] { new DateTime(2021, 10, 21, 9, 9, 3, 49, DateTimeKind.Utc).AddTicks(1724), "https://picsum.photos/100?random=5", new DateTime(2021, 10, 21, 9, 9, 3, 49, DateTimeKind.Utc).AddTicks(1724) });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageURL",
                table: "Listings");

            migrationBuilder.UpdateData(
                table: "Listings",
                keyColumn: "ListingID",
                keyValue: 1001,
                column: "DateListed",
                value: new DateTime(2021, 10, 20, 12, 52, 53, 536, DateTimeKind.Utc).AddTicks(4632));

            migrationBuilder.UpdateData(
                table: "Listings",
                keyColumn: "ListingID",
                keyValue: 1002,
                column: "DateListed",
                value: new DateTime(2021, 10, 20, 12, 52, 53, 536, DateTimeKind.Utc).AddTicks(6076));

            migrationBuilder.UpdateData(
                table: "Listings",
                keyColumn: "ListingID",
                keyValue: 1003,
                column: "DateListed",
                value: new DateTime(2021, 10, 20, 12, 52, 53, 536, DateTimeKind.Utc).AddTicks(6080));

            migrationBuilder.UpdateData(
                table: "Listings",
                keyColumn: "ListingID",
                keyValue: 1004,
                column: "DateListed",
                value: new DateTime(2021, 10, 20, 12, 52, 53, 536, DateTimeKind.Utc).AddTicks(6081));

            migrationBuilder.UpdateData(
                table: "Listings",
                keyColumn: "ListingID",
                keyValue: 1005,
                column: "DateListed",
                value: new DateTime(2021, 10, 20, 12, 52, 53, 536, DateTimeKind.Utc).AddTicks(6082));

            migrationBuilder.UpdateData(
                table: "Listings",
                keyColumn: "ListingID",
                keyValue: 1006,
                columns: new[] { "DateListed", "ServAvailability" },
                values: new object[] { new DateTime(2021, 10, 20, 12, 52, 53, 536, DateTimeKind.Utc).AddTicks(6083), new DateTime(2021, 10, 20, 12, 52, 53, 536, DateTimeKind.Utc).AddTicks(6083) });

            migrationBuilder.UpdateData(
                table: "Listings",
                keyColumn: "ListingID",
                keyValue: 1007,
                columns: new[] { "DateListed", "ServAvailability" },
                values: new object[] { new DateTime(2021, 10, 20, 12, 52, 53, 536, DateTimeKind.Utc).AddTicks(6506), new DateTime(2021, 10, 20, 12, 52, 53, 536, DateTimeKind.Utc).AddTicks(6507) });

            migrationBuilder.UpdateData(
                table: "Listings",
                keyColumn: "ListingID",
                keyValue: 1008,
                columns: new[] { "DateListed", "ServAvailability" },
                values: new object[] { new DateTime(2021, 10, 20, 12, 52, 53, 536, DateTimeKind.Utc).AddTicks(6508), new DateTime(2021, 10, 20, 12, 52, 53, 536, DateTimeKind.Utc).AddTicks(6508) });

            migrationBuilder.UpdateData(
                table: "Listings",
                keyColumn: "ListingID",
                keyValue: 1009,
                columns: new[] { "DateListed", "ServAvailability" },
                values: new object[] { new DateTime(2021, 10, 20, 12, 52, 53, 536, DateTimeKind.Utc).AddTicks(6509), new DateTime(2021, 10, 20, 12, 52, 53, 536, DateTimeKind.Utc).AddTicks(6510) });

            migrationBuilder.UpdateData(
                table: "Listings",
                keyColumn: "ListingID",
                keyValue: 1010,
                columns: new[] { "DateListed", "ServAvailability" },
                values: new object[] { new DateTime(2021, 10, 20, 12, 52, 53, 536, DateTimeKind.Utc).AddTicks(6511), new DateTime(2021, 10, 20, 12, 52, 53, 536, DateTimeKind.Utc).AddTicks(6511) });
        }
    }
}
