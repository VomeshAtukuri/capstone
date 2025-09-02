namespace backend.DTO
{
    public class AddToCartDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
    public class RemoveFromCartDto
    {
        public int ProductId { get; set; }
    }
}
