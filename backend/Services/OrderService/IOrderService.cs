using backend.DTO;
using backend.Models;

namespace backend.Services.OrderService
{
    public interface IOrderService
    {
        Task<int> CheckoutAsync(int userId, CheckoutDto dto);
        Task<IEnumerable<object>> GetOrdersAsync(int userId, string role);
        Task<object?> GetOrderAsync(int userId, int orderId);
        Task UpdateOrderStatusAsync(int orderId, string status);
    }
}
