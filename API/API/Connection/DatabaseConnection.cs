using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
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

        private readonly string ConnectionString = "dummyCONNECTIONstring";

        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(ConnectionString);
        }


        // Call this method from Register to pass an object to the clientside copy of the database
        // then save it to the real database

        public int CreateUser(User user)
        {

            using (var db = new DatabaseConnection())
            {
                var userData = user;
                db.Users.Add(userData);
                db.SaveChanges();
            }



                return 1;
        }
    }
}
