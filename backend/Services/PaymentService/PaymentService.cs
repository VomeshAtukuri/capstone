using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.PaymentService
{
    public class PaymentService : IPaymentService
    {
        private readonly ECommerceDbContext _context;

        public PaymentService(ECommerceDbContext context)
        {
            _context = context;
        }

        public async Task<object> MakePaymentAsync(int userId, PaymentDto dto)
        {
            var order = await _context.Orders
                .FirstOrDefaultAsync(o => o.OrderId == dto.OrderId && o.UserId == userId);

            if (order == null)
                throw new Exception("Order not found");

            if (order.Status != "Pending")
                throw new Exception("Order already paid or processed");

            // Simulate payment
            var payment = new Payment
            {
                OrderId = dto.OrderId,
                Amount = order.TotalAmount,
                PaymentMethod = dto.PaymentMethod,
                Status = "Success", // Simulating always successful
                TransactionId = Guid.NewGuid().ToString(),
                PaidAt = DateTime.UtcNow
            };

            _context.Payments.Add(payment);

            // Update order status
            order.Status = "Paid";
            await _context.SaveChangesAsync();

            return new
            {
                Message = "Payment successful",
                payment.PaymentId,
                payment.TransactionId,
                OrderStatus = order.Status
            };
        }
    }
}
