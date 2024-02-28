﻿using BMWApi.Data;
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
        public void CreateCarExtras(CarExtras carExtras)
        {
            if (carExtras == null)
            {
                throw new ArgumentNullException(nameof(carExtras));
            }

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
            existingCarExtras.UpgradedAlloys = carExtras.UpgradedAlloys;
            existingCarExtras.HeatedSeats = carExtras.HeatedSeats;
            existingCarExtras.ParkAssist = carExtras.ParkAssist;
            existingCarExtras.LaneAssist = carExtras.LaneAssist;
            existingCarExtras.CupHolders = carExtras.CupHolders;
            existingCarExtras.NavigationSystem = carExtras.NavigationSystem;
            existingCarExtras.PremiumSoundSystem = carExtras.PremiumSoundSystem;
            existingCarExtras.WirelessCharging = carExtras.WirelessCharging;
            existingCarExtras.RemoteStart = carExtras.RemoteStart;
            existingCarExtras.AdaptiveCruiseControl = carExtras.AdaptiveCruiseControl;
            existingCarExtras.BlindSpotMonitoring = carExtras.BlindSpotMonitoring;
            existingCarExtras.KeylessEntry = carExtras.KeylessEntry;
            existingCarExtras.AutoDimmingMirrors = carExtras.AutoDimmingMirrors;
            existingCarExtras.PowerLiftgate = carExtras.PowerLiftgate;
            existingCarExtras.CameraSystem360 = carExtras.CameraSystem360;
            existingCarExtras.TrafficSignRecognition = carExtras.TrafficSignRecognition;
            existingCarExtras.DriverAssistancePackage = carExtras.DriverAssistancePackage;
            existingCarExtras.MemorySeats = carExtras.MemorySeats;
            existingCarExtras.HeatedSteeringWheel = carExtras.HeatedSteeringWheel;
            existingCarExtras.VentilatedSeats = carExtras.VentilatedSeats;
            // Add other properties here

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
                if (extra.PanRoof) totalCost += 1500;
                if (extra.UpgradedAlloys) totalCost += 1200;
                if (extra.HeatedSeats) totalCost += 800;
                if (extra.ParkAssist) totalCost += 1000;
                if (extra.LaneAssist) totalCost += 900;
                if (extra.CupHolders) totalCost += 50;
                if (extra.NavigationSystem) totalCost += 1500;
                if (extra.PremiumSoundSystem) totalCost += 2000;
                if (extra.WirelessCharging) totalCost += 300;
                if (extra.RemoteStart) totalCost += 700;
                if (extra.AdaptiveCruiseControl) totalCost += 1200;
                if (extra.BlindSpotMonitoring) totalCost += 1000;
                if (extra.KeylessEntry) totalCost += 600;
                if (extra.AutoDimmingMirrors) totalCost += 400;
                if (extra.PowerLiftgate) totalCost += 800;
                if (extra.CameraSystem360) totalCost += 1500;
                if (extra.TrafficSignRecognition) totalCost += 1000;
                if (extra.DriverAssistancePackage) totalCost += 2000;
                if (extra.MemorySeats) totalCost += 500;
                if (extra.HeatedSteeringWheel) totalCost += 600;
                if (extra.VentilatedSeats) totalCost += 900;
                // Add other properties here
            }
            return totalCost;
        }
    }
}
