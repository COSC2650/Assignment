using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Connection
{
    static public class Crud
    {
        static public int DeployUser(User user)
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
