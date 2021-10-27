using System;
using System.Net.Mail;

namespace API.Extensions
{
    public class Mailer
    {
        private readonly ISmtpClient _client;

        public Mailer(ISmtpClient client)
        {
            _client = client;
        }

        public bool SendRegistrationMail(string email, int confirmationCode) {
            bool result = true;

            //VERIFY EMAIL USING AMAZON SES
            MailAddress from = new("nonotrespond@zipitonline.com");

            //ADDRESS OF THE CODE RECIPIENT
            MailAddress to = new(email);
            MailMessage message = new(from, to);

            message.Subject ="Confirmation Code";

            message.Body = String.Concat("Welcome to Zip It Online!", "\n\n", "Please enter the following confirmation code in the login screen to activate your account: ", confirmationCode.ToString());
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
    }
}