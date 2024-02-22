using BMWApi.Data;
using BMWApi.Models;

namespace BMWApi.Services
{
    public class CarExtrasService
    {
        private readonly AppDbContext _context;

        public CarExtrasService(AppDbContext context)
        {
            _context = context;
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

            existingCarExtras.PanRoof = carExtras.PanRoof;
            existingCarExtras.UpgradedAlloys = carExtras.UpgradedAlloys;
            // Update other properties as needed

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
    }
}
