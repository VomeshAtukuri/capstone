namespace backend.Models
{
    public class Payment
    {
        public int PaymentId { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; }

        public decimal Amount { get; set; }
        public string PaymentMethod { get; set; }  // Stripe, PayPal, COD
        public string Status { get; set; } = "Pending"; // Pending, Success, Failed
        public string? TransactionId { get; set; }
        public DateTime? PaidAt { get; set; }
    }
}
