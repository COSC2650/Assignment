using Xunit;
using Moq;
using API.Models;
using API.Services;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Collections.Generic;
using AutoFixture;
using System.Threading.Tasks;
using API.GraphQL.Users;

namespace Tests
{
    public class Mailer_Test {

        [Fact]
        public void SendEmail()
        {
            Mailer mailer = new Mailer("email@gmail.com");

            Assert.NotNull(SMTP_USERNAME,SMTP_PASSWORD,HOST,PORT,client);
        }

        public void SecureRNG(){

            Mailer mailer = new Mailer("email@gmail.com");

            int rng1 = mailer.ConfirmCodeGenerator();
            int rng2 = mailer.ConfirmCodeGenerator();

            Assert(rng1!=rng2);
            Assert.NotNull(rng1,rng2);
        }
    }
}