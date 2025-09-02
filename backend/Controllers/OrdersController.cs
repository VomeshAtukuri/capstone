using backend.DTO;
using backend.DTOs;
using backend.Services.OrderService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/orders")]
    [Authorize] // all endpoints require auth
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        private int GetUserId() =>
            int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

        private string GetUserRole() =>
            User.FindFirst(ClaimTypes.Role)?.Value ?? "";

        [HttpPost("checkout")]
        public async Task<IActionResult> Checkout(CheckoutDto dto)
        {
            var userId = GetUserId();
            var orderId = await _orderService.CheckoutAsync(userId, dto);
            return Ok(new { Message = "Order placed successfully", OrderId = orderId });
        }

        [HttpGet]
        public async Task<IActionResult> GetOrders()
        {
            var userId = GetUserId();
            var role = GetUserRole();
            var orders = await _orderService.GetOrdersAsync(userId, role);
            return Ok(orders);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> GetOrder(int id)
        {
            var userId = GetUserId();
            var order = await _orderService.GetOrderAsync(userId, id);

            if (order == null) return NotFound();
            return Ok(order);
        }

        [HttpPut("{id}/status")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateOrderStatus(int id, UpdateOrderStatusDto dto)
        {
            await _orderService.UpdateOrderStatusAsync(id, dto.Status);
            return Ok(new { Message = $"Order status updated to {dto.Status}" });
        }
    }
}
