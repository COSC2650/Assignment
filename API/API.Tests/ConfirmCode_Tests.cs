using Xunit;
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
    public class ConfirmCode_Tests
    {
        [Theory]
        [InlineData("test@email.com", int.MinValue)]
        [InlineData("test@email.com", int.MaxValue)]
        [InlineData("test@email.com", 0)]
        public void NewConfirmCode(string Email, int Code)
        {
            ConfirmCode confirmCode = new()
            {
                Email = Email,
                Code = Code
            };

            Assert.Equal(confirmCode.Email, Email);
            Assert.Equal(confirmCode.Code, Code);
        }
    }
}