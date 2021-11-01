using Xunit;
using API.Extensions;
using System.Net.Mail;
using Moq;

namespace Tests
{
    public class Mailer_Tests
    {

        [Fact]
        public void SendEmail()
        {
            // Mock an instance of the SMTP client
            Mock<ISmtpClient> mockedSMTPClient = new();

            // Set up a new mailer instance
            Mailer mailer = new(mockedSMTPClient.Object);

            // Send the mail
            mailer.SendRegistrationMail("email@gmail.com", 1234);

            // Ensure it runs
            mockedSMTPClient.Verify(x => x.Send(It.IsAny<MailMessage>()), Times.Once());
        }

        [Fact]
        public void SecureRNG()
        {
            // Grab confirmation codes
            int rng1 = CodeGenerator.ConfirmCodeGenerator();
            int rng2 = CodeGenerator.ConfirmCodeGenerator();

            // Assert that we have values
            Assert.True(rng1 > 0);
            Assert.True(rng2 > 0);

            // Assert that we're retriving different values each time
            Assert.NotEqual(rng1, rng2);
        }
    }
}