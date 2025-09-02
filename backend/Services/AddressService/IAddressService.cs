using backend.DTOs;
using backend.Models;

namespace backend.Services.AddressService
{
    public interface IAddressService
    {
        Task<IEnumerable<Address>> GetAddressesAsync(int userId);
        Task<object> AddAddressAsync(int userId, AddressDto dto);
        Task<object> UpdateAddressAsync(int userId, int id, AddressDto dto);
        Task<object> DeleteAddressAsync(int userId, int id);
    }
}
