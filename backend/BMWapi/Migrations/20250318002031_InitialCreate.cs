using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BMWApi.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CarExtras",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PanRoof = table.Column<bool>(type: "bit", nullable: false),
                    PanRoofPrice = table.Column<int>(type: "int", nullable: false),
                    UpgradedAlloys = table.Column<bool>(type: "bit", nullable: false),
                    UpgradedAlloysPrice = table.Column<int>(type: "int", nullable: false),
                    HeatedSeats = table.Column<bool>(type: "bit", nullable: false),
                    HeatedSeatsPrice = table.Column<int>(type: "int", nullable: false),
                    ParkAssist = table.Column<bool>(type: "bit", nullable: false),
                    ParkAssistPrice = table.Column<int>(type: "int", nullable: false),
                    LaneAssist = table.Column<bool>(type: "bit", nullable: false),
                    LaneAssistPrice = table.Column<int>(type: "int", nullable: false),
                    CupHolders = table.Column<bool>(type: "bit", nullable: false),
                    CupHoldersPrice = table.Column<int>(type: "int", nullable: false),
                    NavigationSystem = table.Column<bool>(type: "bit", nullable: false),
                    NavigationSystemPrice = table.Column<int>(type: "int", nullable: false),
                    PremiumSoundSystem = table.Column<bool>(type: "bit", nullable: false),
                    PremiumSoundSystemPrice = table.Column<int>(type: "int", nullable: false),
                    WirelessCharging = table.Column<bool>(type: "bit", nullable: false),
                    WirelessChargingPrice = table.Column<int>(type: "int", nullable: false),
                    RemoteStart = table.Column<bool>(type: "bit", nullable: false),
                    RemoteStartPrice = table.Column<int>(type: "int", nullable: false),
                    AdaptiveCruiseControl = table.Column<bool>(type: "bit", nullable: false),
                    AdaptiveCruiseControlPrice = table.Column<int>(type: "int", nullable: false),
                    BlindSpotMonitoring = table.Column<bool>(type: "bit", nullable: false),
                    BlindSpotMonitoringPrice = table.Column<int>(type: "int", nullable: false),
                    KeylessEntry = table.Column<bool>(type: "bit", nullable: false),
                    KeylessEntryPrice = table.Column<int>(type: "int", nullable: false),
                    AutoDimmingMirrors = table.Column<bool>(type: "bit", nullable: false),
                    AutoDimmingMirrorsPrice = table.Column<int>(type: "int", nullable: false),
                    PowerLiftgate = table.Column<bool>(type: "bit", nullable: false),
                    PowerLiftgatePrice = table.Column<int>(type: "int", nullable: false),
                    CameraSystem360 = table.Column<bool>(type: "bit", nullable: false),
                    CameraSystem360Price = table.Column<int>(type: "int", nullable: false),
                    TrafficSignRecognition = table.Column<bool>(type: "bit", nullable: false),
                    TrafficSignRecognitionPrice = table.Column<int>(type: "int", nullable: false),
                    DriverAssistancePackage = table.Column<bool>(type: "bit", nullable: false),
                    DriverAssistancePackagePrice = table.Column<int>(type: "int", nullable: false),
                    MemorySeats = table.Column<bool>(type: "bit", nullable: false),
                    MemorySeatsPrice = table.Column<int>(type: "int", nullable: false),
                    HeatedSteeringWheel = table.Column<bool>(type: "bit", nullable: false),
                    HeatedSteeringWheelPrice = table.Column<int>(type: "int", nullable: false),
                    VentilatedSeats = table.Column<bool>(type: "bit", nullable: false),
                    VentilatedSeatsPrice = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarExtras", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CarExtras");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
