
namespace API.Extensions
{
    public static class CodeGenerator
    {
        public static int ConfirmCodeGenerator()
        {
            return System.Security.Cryptography.RandomNumberGenerator.GetInt32(0, 99999);
        }
    }
}