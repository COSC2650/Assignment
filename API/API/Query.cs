using Microsoft.Extensions.Logging;

namespace API
{
    public class Query
    {
        private readonly ILogger<Query> Logger;
        public Query(ILogger<Query> logger)
        {
            Logger = logger;
        }

        public Book GetBook() {
            Logger.LogInformation("GetBook called!");

            return new() {
                Title = "C# in depth.",
                Author = new Author
                {
                    Name = "Jon Skeet"
                }
            };
        }
    }
}