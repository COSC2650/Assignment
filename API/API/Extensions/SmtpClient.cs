using System.Net.Mail;
using System.Net;

namespace API.Extensions
{
    public class SmtpClient: ISmtpClient
    {
        private readonly System.Net.Mail.SmtpClient _smtpClient;

        public SmtpClient() {
            // Replace smtp_password with your Amazon SES SMTP username
#if DEBUG
            string SMTP_USERNAME = "smtp_username";
#else
            string SMTP_USERNAME = System.Environment.GetEnvironmentVariable("SMTP_USERNAME");
#endif

            // Replace smtp_password with your Amazon SES SMTP password.
#if DEBUG
            string SMTP_PASSWORD = "smtp_password";
#else
            string SMTP_PASSWORD = System.Environment.GetEnvironmentVariable("SMTP_PASSWORD");
#endif

            // If you're using Amazon SES in a region other than US West (Oregon), 
            // replace email-smtp.us-west-2.amazonaws.com with the Amazon SES SMTP  
            // endpoint in the appropriate AWS Region.
#if DEBUG
            string HOST = "host";
#else
            string HOST = System.Environment.GetEnvironmentVariable("SMTP_HOST");
#endif

            // The port you will connect to on the Amazon SES SMTP endpoint. We
            // are choosing port 587 because we will use STARTTLS to encrypt
            // the connection.
            int PORT = 587;

            _smtpClient = new(HOST, PORT);

            // Pass SMTP credentials
            _smtpClient.Credentials = new NetworkCredential(SMTP_USERNAME, SMTP_PASSWORD); //NOSONAR

            // Enable SSL encryption
            _smtpClient.EnableSsl = true;
        }

        public void Send(MailMessage mailMessage) {
            _smtpClient.Send(mailMessage);
        }
    }
}