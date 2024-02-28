using BMWApi.Data;
using BMWApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BMWApi.Services
{
    public class CarExtrasService
    {
        private readonly AppDbContext _context;

        public CarExtrasService(AppDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        // Method to retrieve all car extras
        public List<CarExtras> GetAllCarExtras()
        {
            return _context.CarExtras.ToList();
        }

        // Method to retrieve a car extra by ID
        public CarExtras GetCarExtrasById(int id)
        {
            return _context.CarExtras.FirstOrDefault(c => c.Id == id);
        }

        // Method to create a new car extra
        // Method to create a new car extra
        public void CreateCarExtras(CarExtras carExtras)
        {
            if (carExtras == null)
            {
                throw new ArgumentNullException(nameof(carExtras));
            }

            // Set prices for selected extras
            carExtras.PanRoofPrice = carExtras.PanRoof ? 1500 : 0;
            carExtras.UpgradedAlloysPrice = carExtras.UpgradedAlloys ? 1200 : 0;
            carExtras.HeatedSeatsPrice = carExtras.HeatedSeats ? 800 : 0;
            carExtras.ParkAssistPrice = carExtras.ParkAssist ? 1000 : 0;
            carExtras.LaneAssistPrice = carExtras.LaneAssist ? 900 : 0;
            carExtras.CupHoldersPrice = carExtras.CupHolders ? 50 : 0;
            carExtras.NavigationSystemPrice = carExtras.NavigationSystem ? 1500 : 0;
            carExtras.PremiumSoundSystemPrice = carExtras.PremiumSoundSystem ? 2000 : 0;
            carExtras.WirelessChargingPrice = carExtras.WirelessCharging ? 300 : 0;
            carExtras.RemoteStartPrice = carExtras.RemoteStart ? 700 : 0;
            carExtras.AdaptiveCruiseControlPrice = carExtras.AdaptiveCruiseControl ? 1200 : 0;
            carExtras.BlindSpotMonitoringPrice = carExtras.BlindSpotMonitoring ? 1000 : 0;
            carExtras.KeylessEntryPrice = carExtras.KeylessEntry ? 600 : 0;
            carExtras.AutoDimmingMirrorsPrice = carExtras.AutoDimmingMirrors ? 400 : 0;
            carExtras.PowerLiftgatePrice = carExtras.PowerLiftgate ? 800 : 0;
            carExtras.CameraSystem360Price = carExtras.CameraSystem360 ? 1500 : 0;
            carExtras.TrafficSignRecognitionPrice = carExtras.TrafficSignRecognition ? 1000 : 0;
            carExtras.DriverAssistancePackagePrice = carExtras.DriverAssistancePackage ? 2000 : 0;
            carExtras.MemorySeatsPrice = carExtras.MemorySeats ? 500 : 0;
            carExtras.HeatedSteeringWheelPrice = carExtras.HeatedSteeringWheel ? 600 : 0;
            carExtras.VentilatedSeatsPrice = carExtras.VentilatedSeats ? 900 : 0;

            // Add the carExtras object to the database
            _context.CarExtras.Add(carExtras);
            _context.SaveChanges();
        }


        // Method to update an existing car extra
        public void UpdateCarExtras(int id, CarExtras carExtras)
        {
            var existingCarExtras = _context.CarExtras.FirstOrDefault(c => c.Id == id);
            if (existingCarExtras == null)
            {
                throw new ArgumentException($"CarExtras with ID {id} not found");
            }

            // Update all properties
            existingCarExtras.PanRoof = carExtras.PanRoof;
            existingCarExtras.PanRoofPrice = carExtras.PanRoof ? 1500 : 0;
            existingCarExtras.UpgradedAlloys = carExtras.UpgradedAlloys;
            existingCarExtras.UpgradedAlloysPrice = carExtras.UpgradedAlloys ? 1200 : 0;
            existingCarExtras.HeatedSeats = carExtras.HeatedSeats;
            existingCarExtras.HeatedSeatsPrice = carExtras.HeatedSeats ? 800 : 0;
            existingCarExtras.ParkAssist = carExtras.ParkAssist;
            existingCarExtras.ParkAssistPrice = carExtras.ParkAssist ? 1000 : 0;
            existingCarExtras.LaneAssist = carExtras.LaneAssist;
            existingCarExtras.LaneAssistPrice = carExtras.LaneAssist ? 900 : 0;
            existingCarExtras.CupHolders = carExtras.CupHolders;
            existingCarExtras.CupHoldersPrice = carExtras.CupHolders ? 50 : 0;
            existingCarExtras.NavigationSystem = carExtras.NavigationSystem;
            existingCarExtras.NavigationSystemPrice = carExtras.NavigationSystem ? 1500 : 0;
            existingCarExtras.PremiumSoundSystem = carExtras.PremiumSoundSystem;
            existingCarExtras.PremiumSoundSystemPrice = carExtras.PremiumSoundSystem ? 2000 : 0;
            existingCarExtras.WirelessCharging = carExtras.WirelessCharging;
            existingCarExtras.WirelessChargingPrice = carExtras.WirelessCharging ? 300 : 0;
            existingCarExtras.RemoteStart = carExtras.RemoteStart;
            existingCarExtras.RemoteStartPrice = carExtras.RemoteStart ? 700 : 0;
            existingCarExtras.AdaptiveCruiseControl = carExtras.AdaptiveCruiseControl;
            existingCarExtras.AdaptiveCruiseControlPrice = carExtras.AdaptiveCruiseControl ? 1200 : 0;
            existingCarExtras.BlindSpotMonitoring = carExtras.BlindSpotMonitoring;
            existingCarExtras.BlindSpotMonitoringPrice = carExtras.BlindSpotMonitoring ? 1000 : 0;
            existingCarExtras.KeylessEntry = carExtras.KeylessEntry;
            existingCarExtras.KeylessEntryPrice = carExtras.KeylessEntry ? 600 : 0;
            existingCarExtras.AutoDimmingMirrors = carExtras.AutoDimmingMirrors;
            existingCarExtras.AutoDimmingMirrorsPrice = carExtras.AutoDimmingMirrors ? 400 : 0;
            existingCarExtras.PowerLiftgate = carExtras.PowerLiftgate;
            existingCarExtras.PowerLiftgatePrice = carExtras.PowerLiftgate ? 800 : 0;
            existingCarExtras.CameraSystem360 = carExtras.CameraSystem360;
            existingCarExtras.CameraSystem360Price = carExtras.CameraSystem360 ? 1500 : 0;
            existingCarExtras.TrafficSignRecognition = carExtras.TrafficSignRecognition;
            existingCarExtras.TrafficSignRecognitionPrice = carExtras.TrafficSignRecognition ? 1000 : 0;
            existingCarExtras.DriverAssistancePackage = carExtras.DriverAssistancePackage;
            existingCarExtras.DriverAssistancePackagePrice = carExtras.DriverAssistancePackage ? 2000 : 0;
            existingCarExtras.MemorySeats = carExtras.MemorySeats;
            existingCarExtras.MemorySeatsPrice = carExtras.MemorySeats ? 500 : 0;
            existingCarExtras.HeatedSteeringWheel = carExtras.HeatedSteeringWheel;
            existingCarExtras.HeatedSteeringWheelPrice = carExtras.HeatedSteeringWheel ? 600 : 0;
            existingCarExtras.VentilatedSeats = carExtras.VentilatedSeats;
            existingCarExtras.VentilatedSeatsPrice = carExtras.VentilatedSeats ? 900 : 0;
            // Add other properties and prices here

            _context.SaveChanges();
        }

        // Method to delete a car extra by ID
        public void DeleteCarExtras(int id)
        {
            var carExtras = _context.CarExtras.FirstOrDefault(c => c.Id == id);
            if (carExtras == null)
            {
                throw new ArgumentException($"CarExtras with ID {id} not found");
            }

            _context.CarExtras.Remove(carExtras);
            _context.SaveChanges();
        }

        // Method to calculate total cost based on selected extras
        public decimal CalculateTotalCost(List<CarExtras> selectedExtras)
        {
            decimal totalCost = 0;
            foreach (var extra in selectedExtras)
            {
                totalCost += extra.PanRoof ? extra.PanRoofPrice : 0;
                totalCost += extra.UpgradedAlloys ? extra.UpgradedAlloysPrice : 0;
                totalCost += extra.HeatedSeats ? extra.HeatedSeatsPrice : 0;
                totalCost += extra.ParkAssist ? extra.ParkAssistPrice : 0;
                totalCost += extra.LaneAssist ? extra.LaneAssistPrice : 0;
                totalCost += extra.CupHolders ? extra.CupHoldersPrice : 0;
                totalCost += extra.NavigationSystem ? extra.NavigationSystemPrice : 0;
                totalCost += extra.PremiumSoundSystem ? extra.PremiumSoundSystemPrice : 0;
                totalCost += extra.WirelessCharging ? extra.WirelessChargingPrice : 0;
                totalCost += extra.RemoteStart ? extra.RemoteStartPrice : 0;
                totalCost += extra.AdaptiveCruiseControl ? extra.AdaptiveCruiseControlPrice : 0;
                totalCost += extra.BlindSpotMonitoring ? extra.BlindSpotMonitoringPrice : 0;
                totalCost += extra.KeylessEntry ? extra.KeylessEntryPrice : 0;
                totalCost += extra.AutoDimmingMirrors ? extra.AutoDimmingMirrorsPrice : 0;
                totalCost += extra.PowerLiftgate ? extra.PowerLiftgatePrice : 0;
                totalCost += extra.CameraSystem360 ? extra.CameraSystem360Price : 0;
                totalCost += extra.TrafficSignRecognition ? extra.TrafficSignRecognitionPrice : 0;
                totalCost += extra.DriverAssistancePackage ? extra.DriverAssistancePackagePrice : 0;
                totalCost += extra.MemorySeats ? extra.MemorySeatsPrice : 0;
                totalCost += extra.HeatedSteeringWheel ? extra.HeatedSteeringWheelPrice : 0;
                totalCost += extra.VentilatedSeats ? extra.VentilatedSeatsPrice : 0;
                // Add other properties and prices here
            }
            return totalCost;
        }
    }
}
