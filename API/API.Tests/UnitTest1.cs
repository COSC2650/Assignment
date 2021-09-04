using System;
using Xunit;
using API;

namespace Tests
{
    public class UnitTest1
    {
        [Theory]
        [InlineData("Test name")]
        [InlineData(null)]
        [InlineData("")]
        public void Author(String name)
        {
            Author author = new Author();
            author.Name = name;
            Assert.Equal(name, author.Name);
        }

        [Theory]
        [InlineData("Book name", "Test name")]
        [InlineData(null, null)]
        [InlineData("", "")]
        public void Book(String bookTitle, String authorName)
        {
            Book book = new Book();
            book.Title = bookTitle;

            Author author = new Author();
            author.Name = authorName;

            book.Author = author;

            Assert.Equal(bookTitle, book.Title);
            Assert.Equal(authorName, book.Author.Name);

        }

        [Fact]
        public void GetBookQuery()
        {
            Query query = new Query();

            Assert.Equal("C# in depth.", query.GetBook().Title);
            Assert.Equal("Jon Skeet", query.GetBook().Author.Name);
        }
    }
}
