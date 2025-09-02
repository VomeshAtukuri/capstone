using backend.Data;
using backend.DTO;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.CartService
{
    public class CartService : ICartService
    {
        private readonly ECommerceDbContext _context;

        public CartService(ECommerceDbContext context)
        {
            _context = context;
        }

        public async Task<object> GetCartAsync(int userId)
        {
            var cart = await _context.Carts
                .Include(c => c.CartItems)
                .ThenInclude(ci => ci.Product)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
                return new { Items = new List<object>(), Total = 0 };

            return new
            {
                Items = cart.CartItems.Select(ci => new
                {
                    ci.ProductId,
                    ci.Product.Name,
                    ci.Product.Price,
                    ci.Quantity,
                    Subtotal = ci.Product.Price * ci.Quantity
                }),
                Total = cart.CartItems.Sum(ci => ci.Product.Price * ci.Quantity)
            };
        }

        public async Task AddToCartAsync(int userId, AddToCartDto dto)
        {
            var cart = await _context.Carts
                .Include(c => c.CartItems)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
            {
                cart = new Cart { UserId = userId, CartItems = new List<CartItem>() };
                _context.Carts.Add(cart);
            }

            var existingItem = cart.CartItems.FirstOrDefault(ci => ci.ProductId == dto.ProductId);
            if (existingItem != null)
            {
                existingItem.Quantity += dto.Quantity;
            }
            else
            {
                cart.CartItems.Add(new CartItem
                {
                    ProductId = dto.ProductId,
                    Quantity = dto.Quantity
                });
            }

            await _context.SaveChangesAsync();
        }

        public async Task RemoveFromCartAsync(int userId, RemoveFromCartDto dto)
        {
            var cart = await _context.Carts
                .Include(c => c.CartItems)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null) throw new Exception("Cart not found");

            var item = cart.CartItems.FirstOrDefault(ci => ci.ProductId == dto.ProductId);
            if (item == null) throw new Exception("Item not found in cart");

            _context.CartItems.Remove(item);
            await _context.SaveChangesAsync();
        }

        public async Task ClearCartAsync(int userId)
        {
            var cart = await _context.Carts
                .Include(c => c.CartItems)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null) throw new Exception("Cart not found");

            _context.CartItems.RemoveRange(cart.CartItems);
            await _context.SaveChangesAsync();
        }
    }
}
