using backend.Data;
using backend.DTO;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.AuthService
{
    public class AuthService : IAuthService
    {
        private readonly ECommerceDbContext _context;
        private readonly TokenService _tokenService;

        public AuthService(ECommerceDbContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        public async Task<(bool Success, string Message)> RegisterAsync(RegisterDto dto)
        {
            if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
                return (false, "Email already exists.");

            var passwordHash = PasswordHasher.Hash(dto.Password);

            var user = new User
            {
                FullName = dto.FullName,
                Email = dto.Email,
                PasswordHash = passwordHash,
                RoleId = 2
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return (true, "User registered successfully");
        }

        public async Task<(bool Success, string Message, string? Token, string? UserName, string? Role)> LoginAsync(LoginDto dto)
        {
            var user = await _context.Users.Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Email == dto.Email);

            if (user == null)
                return (false, "Invalid credentials", null, null, null);

            var validPassword = PasswordHasher.Verify(dto.Password, user.PasswordHash);
            if (!validPassword)
                return (false, "Invalid credentials", null, null, null);

            var token = _tokenService.CreateToken(user);

            return (true, "Login successful", token, user.FullName, user.Role.RoleName);
        }
    }
}
