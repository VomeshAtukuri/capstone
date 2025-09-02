using System.Net;

namespace backend.Models
{
    public class Order
    {
        public int OrderId { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }

        public int AddressId { get; set; }
        public Address Address { get; set; }

        public decimal TotalAmount { get; set; }
        public string Status { get; set; } = "Pending"; // Pending, Paid, Shipped, Completed, Cancelled
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        public ICollection<OrderItem> OrderItems { get; set; }
    }
}
