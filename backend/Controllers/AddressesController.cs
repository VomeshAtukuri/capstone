using backend.DTOs;
using backend.Services.AddressService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/address")]
    [Authorize(Roles = "Customer")]
    public class AddressesController : ControllerBase
    {
        private readonly IAddressService _addressService;

        public AddressesController(IAddressService addressService)
        {
            _addressService = addressService;
        }

        private int GetUserId() =>
            int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

        [HttpGet]
        public async Task<IActionResult> GetAddresses()
        {
            var userId = GetUserId();
            var addresses = await _addressService.GetAddressesAsync(userId);
            return Ok(addresses);
        }

        [HttpPost]
        public async Task<IActionResult> AddAddress(AddressDto dto)
        {
            var userId = GetUserId();
            var result = await _addressService.AddAddressAsync(userId, dto);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAddress(int id, AddressDto dto)
        {
            try
            {
                var userId = GetUserId();
                var result = await _addressService.UpdateAddressAsync(userId, id, dto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return NotFound(new { Error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAddress(int id)
        {
            try
            {
                var userId = GetUserId();
                var result = await _addressService.DeleteAddressAsync(userId, id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return NotFound(new { Error = ex.Message });
            }
        }
    }
}
