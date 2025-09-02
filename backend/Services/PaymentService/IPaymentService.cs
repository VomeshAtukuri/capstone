using backend.DTOs;

namespace backend.Services.PaymentService
{
    public interface IPaymentService
    {
        Task<object> MakePaymentAsync(int userId, PaymentDto dto);
    }
}
