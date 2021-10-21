using System;
using System.Text;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;
using System.Threading;
using System.ComponentModel;

namespace API.Extensions
{
    public class Mailer
    {
        public Mailer(string email)
        {

            //VERIFY EMAIL USING AMAZON SES
            MailAddress from = new("nonotrespond@zipitonline.com");

            //ADDRESS OF THE CODE RECIPIENT
            MailAddress to = new(email);

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

            MailMessage message = new(from, to);

            message.Subject ="Confirmation Code";

            message.Body = "Welcome to Zip It Online!";
            message.Body = "Please enter the confirmation code below to confirm your account";
            message.Body = ConfirmCodeGenerator();
            message.BodyEncoding =  System.Text.Encoding.UTF8;
            message.Subject = "Zip It Online Confirmation";
            message.SubjectEncoding = System.Text.Encoding.UTF8;

           using (var client = new System.Net.Mail.SmtpClient(HOST, PORT))
            {
                // Pass SMTP credentials
                client.Credentials =
                    new NetworkCredential(SMTP_USERNAME, SMTP_PASSWORD);

                // Enable SSL encryption
                client.EnableSsl = true;

                // Try to send the message. Show status in console.
                try
                {
                    //PLACEHOLDER, LINK BACK TO UI
                    Console.WriteLine("Attempting to send email...");
                    client.Send(message);
                    Console.WriteLine("Email sent!");
                }
                catch (Exception ex)
                {
                    //PLACEHOLDER, LINK BACK TO UI
                    Console.WriteLine("The email was not sent.");
                    Console.WriteLine("Error message: " + ex.Message);
                }
            }
        }

        public string ConfirmCodeGenerator(){
            return System.Security.Cryptography.RandomNumberGenerator.GetInt32(0, int.MaxValue).ToString();
        }
    }
}