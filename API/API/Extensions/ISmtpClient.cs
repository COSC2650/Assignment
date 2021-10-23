using System.Net.Mail;

namespace API.Extensions
{
    public interface ISmtpClient
    {
        void Send(MailMessage mailMessage);
    }
}