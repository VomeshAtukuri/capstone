﻿namespace backend.DTOs
{
    public class PaymentDto
    {
        public int OrderId { get; set; }
        public string PaymentMethod { get; set; }  // e.g. "Stripe"
    }
}
