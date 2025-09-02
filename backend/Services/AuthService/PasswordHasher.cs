using System.Security.Cryptography;
using System.Text;

namespace backend.Services.AuthService
{
    public static class PasswordHasher
    {
        private static readonly byte[] PasswordKey = Encoding.UTF8.GetBytes("MySuperSecretStaticKey123!@#");

        public static string Hash(string password)
        {
            using var hmac = new HMACSHA256(PasswordKey);
            return Convert.ToBase64String(hmac.ComputeHash(Encoding.UTF8.GetBytes(password)));
        }

        public static bool Verify(string password, string storedHash)
        {
            var hash = Hash(password);
            return storedHash == hash;
        }
    }
}
