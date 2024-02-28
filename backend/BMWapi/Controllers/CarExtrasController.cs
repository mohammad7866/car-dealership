using BMWApi.Models;
using BMWApi.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace BMWApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarExtrasController : ControllerBase
    {
        private readonly CarExtrasService _carExtrasService;

        public CarExtrasController(CarExtrasService carExtrasService)
        {
            _carExtrasService = carExtrasService ?? throw new ArgumentNullException(nameof(carExtrasService));
        }

        [HttpGet]
        public ActionResult<List<CarExtras>> GetAllCarExtras()
        {
            var carExtras = _carExtrasService.GetAllCarExtras();
            return Ok(carExtras);
        }

        [HttpGet("{id}")]
        public ActionResult<CarExtras> GetCarExtrasById(int id)
        {
            var carExtras = _carExtrasService.GetCarExtrasById(id);
            if (carExtras == null)
            {
                return NotFound();
            }
            return Ok(carExtras);
        }

        [HttpPost]
        public IActionResult CreateCarExtras(CarExtras carExtras)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _carExtrasService.CreateCarExtras(carExtras);
            return CreatedAtAction(nameof(GetCarExtrasById), new { id = carExtras.Id }, carExtras);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateCarExtras(int id, CarExtras carExtras)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _carExtrasService.UpdateCarExtras(id, carExtras);
                return NoContent();
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteCarExtras(int id)
        {
            try
            {
                _carExtrasService.DeleteCarExtras(id);
                return NoContent();
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("calculateTotalCost")]
        public IActionResult CalculateTotalCost(List<CarExtras> selectedExtras)
        {
            try
            {
                decimal totalCost = _carExtrasService.CalculateTotalCost(selectedExtras);
                return Ok(totalCost);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
