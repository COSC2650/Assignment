using System;
using System.Text;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;
using System.Threading;
using System.ComponentModel;

namespace Examples.SmtpExamples.Async
{
    public class Mailer
    {

        static bool mailSent = false;
         private static void SendCompletedCallback(object sender, AsyncCompletedEventArgs e)
        {
            // Get the unique identifier for this asynchronous operation.
             String token = (string) e.UserState;

            if (e.Cancelled)
            {
                 Console.WriteLine("[{0}] Send canceled.", token);
            }
            if (e.Error != null)
            {
                 Console.WriteLine("[{0}] {1}", token, e.Error.ToString());
            } else
            {
                Console.WriteLine("Message sent.");
            }
            mailSent = true;
        }

        public Mailer(string email)
        {

            //SMTP Host of the email provider we choose to send from 
            string smptHost = "smtp.office365.com";

            SmtpClient client = new SmtpClient(smptHost);


            //HARD CODED BUSINESS EMAIL !!!!PLACEHOLDER!!!!
            MailAddress from = new MailAddress("zipitonline@outlook.com");

            MailAddress to = new MailAddress(email);

            MailMessage message = new MailMessage(from, to);

            message.Body = "Welcome to Zip It Online!";
            message.Body = "Please enter the confirmation code below to confirm your account";
            message.Body = ConfirmCodeGenerator();
            message.BodyEncoding =  System.Text.Encoding.UTF8;
            message.Subject = "Zip It Online Confirmation";
            message.SubjectEncoding = System.Text.Encoding.UTF8;

            client.SendCompleted += new
            SendCompletedEventHandler(SendCompletedCallback);

        }

        public string ConfirmCodeGenerator(){
            
            Random rd = new Random();
            int rand_num = rd.Next(0,9999999);
            

            return rand_num.ToString();
        }
    }

    
}