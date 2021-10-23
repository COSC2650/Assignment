using Xunit;
using API.Extensions;
using System.Net.Mail;
using Moq;

namespace Tests
{
    public class Mailer_Test {

        [Fact]
        public void SendEmail()
        {
            // Mock an instance of the SMTP client
            Mock<API.Extensions.SmtpClient> mockedSMTPClient = new();

            // Set up a new mailer instance
            Mailer mailer = new("email@gmail.com", mockedSMTPClient.Object);

            // Send the mail
            mailer.SendMail();

            // Ensure it runs
            mockedSMTPClient.Verify(x => x.Send(It.IsAny<MailMessage>()), Times.Once());
        }

        [Fact]
        public void SecureRNG(){

            // Mock an instance of the SMTP client
            var mockedSMTPClient = new Mock<API.Extensions.SmtpClient>();

            // Create a new instance of the mailer
            Mailer mailer = new("email@gmail.com", mockedSMTPClient.Object);

            // Grab confirmation codes
            int rng1 = int.Parse(mailer.ConfirmCodeGenerator());
            int rng2 = int.Parse(mailer.ConfirmCodeGenerator());

            // Assert that we have values
            Assert.True(rng1 > 0);
            Assert.True(rng2 > 0);

            // Assert that we're retriving different values each time
            Assert.NotEqual(rng1,rng2);
        }
    }
}