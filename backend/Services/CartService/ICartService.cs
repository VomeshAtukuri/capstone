using backend.DTO;

namespace backend.Services.CartService
{
    public interface ICartService
    {
        Task<object> GetCartAsync(int userId);
        Task AddToCartAsync(int userId, AddToCartDto dto);
        Task RemoveFromCartAsync(int userId, RemoveFromCartDto dto);
        Task ClearCartAsync(int userId);
    }
}
