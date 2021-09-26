using Microsoft.EntityFrameworkCore;


namespace API.Connection
{

    //DatabaseConnection must be called to create an offline copy of the data on the database.
    //This copy may be appended, edited, deleted etc and then saved so the changes are reflected
    //on the real database

    public class DatabaseConnection : DbContext
    {
        //A real connection string will need to be added later, Matt K mentioned something about
        // a global variable even though they dont exist in C#

#if DEBUG
        private readonly string ConnectionString = "Your connection string goes ere, don't commit passwords though";
#else
        private readonly string ConnectionString = System.Environment.GetEnvironmentVariable("CONNECTION_STRING");
#endif

        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySQL(ConnectionString);
        }

        // Call this method from Register to pass an object to the clientside copy of the database
        // then save it to the real database
    }
}
