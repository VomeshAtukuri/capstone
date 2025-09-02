namespace backend.Models
{
    public class Address
    {
        public int AddressId { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }

        public string FullName { get; set; }
        public string Phone { get; set; }
        public string AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public string Country { get; set; }
        public bool IsDefault { get; set; }
    }
}
