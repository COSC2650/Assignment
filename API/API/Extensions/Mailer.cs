using System;
using System.Net.Mail;

namespace API.Extensions
{
    public class Mailer
    {
        private readonly string _email;
        private readonly ISmtpClient _client;

        public Mailer(string email, ISmtpClient client)
        {
            _email = email;
            _client = client;
        }

        public bool SendMail() {
            bool result = true;

            //VERIFY EMAIL USING AMAZON SES
            MailAddress from = new("nonotrespond@zipitonline.com");

            //ADDRESS OF THE CODE RECIPIENT
            MailAddress to = new(_email);

            MailMessage message = new(from, to);

            message.Subject ="Confirmation Code";

            message.Body = "Welcome to Zip It Online!";
            message.Body = "Please enter the confirmation code below to confirm your account";
            message.Body = ConfirmCodeGenerator();
            message.BodyEncoding =  System.Text.Encoding.UTF8;
            message.Subject = "Zip It Online Confirmation";
            message.SubjectEncoding = System.Text.Encoding.UTF8;

            // Try to send the message. Show status in console.
            //PLACEHOLDER, LINK BACK TO UI
            Console.WriteLine("Attempting to send email...");
            _client.Send(message);
            Console.WriteLine("Email sent!");

            return result;
        }

        public string ConfirmCodeGenerator(){
            return System.Security.Cryptography.RandomNumberGenerator.GetInt32(0, int.MaxValue).ToString();
        }
    }
}