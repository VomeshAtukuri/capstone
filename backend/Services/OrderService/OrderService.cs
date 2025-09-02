using backend.Data;
using backend.DTO;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.OrderService
{
    public class OrderService : IOrderService
    {
        private readonly ECommerceDbContext _context;

        public OrderService(ECommerceDbContext context)
        {
            _context = context;
        }

        public async Task<int> CheckoutAsync(int userId, CheckoutDto dto)
        {
            var cart = await _context.Carts
                .Include(c => c.CartItems)
                .ThenInclude(ci => ci.Product)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null || !cart.CartItems.Any())
                throw new Exception("Cart is empty");

            var order = new Order
            {
                UserId = userId,
                AddressId = dto.AddressId,
                TotalAmount = cart.CartItems.Sum(ci => (ci.Product.Price ?? 0) * ci.Quantity),
                Status = "Pending",
                OrderItems = cart.CartItems.Select(ci => new OrderItem
                {
                    ProductId = ci.ProductId,
                    Quantity = ci.Quantity,
                    Price = ci.Product.Price ?? 0
                }).ToList()
            };

            _context.Orders.Add(order);
            _context.CartItems.RemoveRange(cart.CartItems);
            await _context.SaveChangesAsync();

            return order.OrderId;
        }

        public async Task<IEnumerable<object>> GetOrdersAsync(int userId, string role)
        {
            IQueryable<Order> query = _context.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                .Include(o => o.Address);

            if (role == "Customer")
                query = query.Where(o => o.UserId == userId);

            var orders = await query
                .OrderByDescending(o => o.CreatedAt)
                .ToListAsync();

            return orders.Select(o => new
            {
                o.OrderId,
                o.Status,
                o.TotalAmount,
                o.CreatedAt,
                Items = o.OrderItems.Select(oi => new
                {
                    oi.ProductId,
                    oi.Product.Name,
                    oi.Product.ImageUrl,
                    oi.Quantity,
                    oi.Price,
                    Subtotal = oi.Quantity * oi.Price
                }),
                Address = new
                {
                    o.Address.FullName,
                    o.Address.Phone,
                    o.Address.AddressLine1,
                    o.Address.City,
                    o.Address.State,
                    o.Address.ZipCode,
                    o.Address.Country
                }
            });
        }

        public async Task<object?> GetOrderAsync(int userId, int orderId)
        {
            var order = await _context.Orders
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.Product)
                .FirstOrDefaultAsync(o => o.OrderId == orderId && o.UserId == userId);

            if (order == null) return null;

            return new
            {
                order.OrderId,
                order.Status,
                order.TotalAmount,
                order.CreatedAt,
                Items = order.OrderItems.Select(oi => new
                {
                    oi.ProductId,
                    oi.Product.Name,
                    oi.Product.ImageUrl,
                    oi.Quantity,
                    oi.Price,
                    Subtotal = oi.Quantity * oi.Price
                })
            };
        }

        public async Task UpdateOrderStatusAsync(int orderId, string status)
        {
            var order = await _context.Orders.FindAsync(orderId);
            if (order == null) throw new Exception("Order not found");

            order.Status = status;
            order.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }
}
