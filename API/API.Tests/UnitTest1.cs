using System;
using Xunit;
using API;
using Moq;
using Microsoft.Extensions.Logging;

namespace Tests
{
    public class UnitTest1
    {
        // [Theory]
        // [InlineData("Test name")]
        // [InlineData(null)]
        // [InlineData("")]
        // public void Author(String name)
        // {
        //     Author author = new();
        //     author.Name = name;
        //     Assert.Equal(name, author.Name);
        // }

        // [Theory]
        // [InlineData("Book name", "Test name")]
        // [InlineData(null, null)]
        // [InlineData("", "")]
        // public void Book(String bookTitle, String authorName)
        // {
        //     Book book = new();
        //     book.Title = bookTitle;

        //     Author author = new();
        //     author.Name = authorName;

        //     book.Author = author;

        //     Assert.Equal(bookTitle, book.Title);
        //     Assert.Equal(authorName, book.Author.Name);

        // }

        // [Fact]
        // public void GetBookQuery()
        // {
        //     var logger = new Mock<ILogger<Query>>();

        //     Query query = new(logger.Object);

        //     Assert.Equal("C# in depth.", query.GetBook().Title);
        //     Assert.Equal("Jon Skeet", query.GetBook().Author.Name);
        // }
    }
}
