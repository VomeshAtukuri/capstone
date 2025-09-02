using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.AddressService
{
    public class AddressService : IAddressService
    {
        private readonly ECommerceDbContext _context;

        public AddressService(ECommerceDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Address>> GetAddressesAsync(int userId)
        {
            return await _context.Addresses
                .Where(a => a.UserId == userId)
                .ToListAsync();
        }

        public async Task<object> AddAddressAsync(int userId, AddressDto dto)
        {
            var address = new Address
            {
                UserId = userId,
                FullName = dto.FullName,
                Phone = dto.Phone,
                AddressLine1 = dto.AddressLine1,
                AddressLine2 = dto.AddressLine2,
                City = dto.City,
                State = dto.State,
                ZipCode = dto.ZipCode,
                Country = dto.Country,
                IsDefault = dto.IsDefault
            };

            _context.Addresses.Add(address);
            await _context.SaveChangesAsync();

            return new { Message = "Address added successfully", AddressId = address.AddressId };
        }

        public async Task<object> UpdateAddressAsync(int userId, int id, AddressDto dto)
        {
            var address = await _context.Addresses
                .FirstOrDefaultAsync(a => a.AddressId == id && a.UserId == userId);

            if (address == null)
                throw new Exception("Address not found");

            address.FullName = dto.FullName;
            address.Phone = dto.Phone;
            address.AddressLine1 = dto.AddressLine1;
            address.AddressLine2 = dto.AddressLine2;
            address.City = dto.City;
            address.State = dto.State;
            address.ZipCode = dto.ZipCode;
            address.Country = dto.Country;
            address.IsDefault = dto.IsDefault;

            await _context.SaveChangesAsync();

            return new { Message = "Address updated successfully" };
        }

        public async Task<object> DeleteAddressAsync(int userId, int id)
        {
            var address = await _context.Addresses
                .FirstOrDefaultAsync(a => a.AddressId == id && a.UserId == userId);

            if (address == null)
                throw new Exception("Address not found");

            _context.Addresses.Remove(address);
            await _context.SaveChangesAsync();

            return new { Message = "Address deleted successfully" };
        }
    }
}
