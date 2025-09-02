using backend.DTO;
using backend.Services.CartService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers
{
    [Route("api/cart")]
    [ApiController]
    [Authorize]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;

        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        private int GetUserId()
        {
            return int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
        }

        [HttpGet]
        public async Task<IActionResult> GetCart()
        {
            var userId = GetUserId();
            var cart = await _cartService.GetCartAsync(userId);
            return Ok(cart);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddToCart(AddToCartDto dto)
        {
            var userId = GetUserId();
            await _cartService.AddToCartAsync(userId, dto);
            return Ok(new { Message = "Product added to cart" });
        }

        [HttpPost("remove")]
        public async Task<IActionResult> RemoveFromCart(RemoveFromCartDto dto)
        {
            var userId = GetUserId();
            await _cartService.RemoveFromCartAsync(userId, dto);
            return Ok(new { Message = "Product removed from cart" });
        }

        [HttpPost("clear")]
        public async Task<IActionResult> ClearCart()
        {
            var userId = GetUserId();
            await _cartService.ClearCartAsync(userId);
            return Ok(new { Message = "Cart cleared" });
        }
    }
}
