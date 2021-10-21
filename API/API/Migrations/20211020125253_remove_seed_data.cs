using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class remove_seed_data : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Listings",
                keyColumn: "ListingID",
                keyValue: 1001,
                column: "DateListed",
                value: new DateTime(2021, 10, 20, 12, 2, 7, 519, DateTimeKind.Utc).AddTicks(581));

            migrationBuilder.UpdateData(
                table: "Listings",
                keyColumn: "ListingID",
                keyValue: 1002,
                column: "DateListed",
                value: new DateTime(2021, 10, 20, 12, 2, 7, 519, DateTimeKind.Utc).AddTicks(2165));

            migrationBuilder.UpdateData(
                table: "Listings",
                keyColumn: "ListingID",
                keyValue: 1003,
                column: "DateListed",
                value: new DateTime(2021, 10, 20, 12, 2, 7, 519, DateTimeKind.Utc).AddTicks(2168));

            migrationBuilder.UpdateData(
                table: "Listings",
                keyColumn: "ListingID",
                keyValue: 1004,
                column: "DateListed",
                value: new DateTime(2021, 10, 20, 12, 2, 7, 519, DateTimeKind.Utc).AddTicks(2169));

            migrationBuilder.UpdateData(
                table: "Listings",
                keyColumn: "ListingID",
                keyValue: 1005,
                column: "DateListed",
                value: new DateTime(2021, 10, 20, 12, 2, 7, 519, DateTimeKind.Utc).AddTicks(2170));

            migrationBuilder.UpdateData(
                table: "Listings",
                keyColumn: "ListingID",
                keyValue: 1006,
                columns: new[] { "DateListed", "ServAvailability" },
                values: new object[] { new DateTime(2021, 10, 20, 12, 2, 7, 519, DateTimeKind.Utc).AddTicks(2171), new DateTime(2021, 10, 20, 12, 2, 7, 519, DateTimeKind.Utc).AddTicks(2171) });

            migrationBuilder.UpdateData(
                table: "Listings",
                keyColumn: "ListingID",
                keyValue: 1007,
                columns: new[] { "DateListed", "ServAvailability" },
                values: new object[] { new DateTime(2021, 10, 20, 12, 2, 7, 519, DateTimeKind.Utc).AddTicks(2427), new DateTime(2021, 10, 20, 12, 2, 7, 519, DateTimeKind.Utc).AddTicks(2427) });

            migrationBuilder.UpdateData(
                table: "Listings",
                keyColumn: "ListingID",
                keyValue: 1008,
                columns: new[] { "DateListed", "ServAvailability" },
                values: new object[] { new DateTime(2021, 10, 20, 12, 2, 7, 519, DateTimeKind.Utc).AddTicks(2428), new DateTime(2021, 10, 20, 12, 2, 7, 519, DateTimeKind.Utc).AddTicks(2428) });

            migrationBuilder.UpdateData(
                table: "Listings",
                keyColumn: "ListingID",
                keyValue: 1009,
                columns: new[] { "DateListed", "ServAvailability" },
                values: new object[] { new DateTime(2021, 10, 20, 12, 2, 7, 519, DateTimeKind.Utc).AddTicks(2429), new DateTime(2021, 10, 20, 12, 2, 7, 519, DateTimeKind.Utc).AddTicks(2430) });

            migrationBuilder.UpdateData(
                table: "Listings",
                keyColumn: "ListingID",
                keyValue: 1010,
                columns: new[] { "DateListed", "ServAvailability" },
                values: new object[] { new DateTime(2021, 10, 20, 12, 2, 7, 519, DateTimeKind.Utc).AddTicks(2431), new DateTime(2021, 10, 20, 12, 2, 7, 519, DateTimeKind.Utc).AddTicks(2431) });
        }
    }
}
