using backend.DTO;

namespace backend.Services.AuthService
{
    public interface IAuthService
    {
        Task<(bool Success, string Message)> RegisterAsync(RegisterDto dto);
        Task<(bool Success, string Message, string? Token, string? UserName, string? Role)> LoginAsync(LoginDto dto);
    }
}
