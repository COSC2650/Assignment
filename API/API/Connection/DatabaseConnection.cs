using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;


namespace API.Connection
{
    public class DatabaseConnection
    {

        string ConnectionString = "dummyCONNECTIONstring";
        SqlConnection con;
        


        // Open a connection so that CRUD operations can be performed

        public void OpenConnection()
        {

            con = new SqlConnection(ConnectionString);
            con.Open(); 


        }

        /*
         * 
         * 
         * Look up EF CORE
         *  and WDT
         * 
         * 
         */

        //Close connection after operations have been completed

        public void CloseConnection()
        {

            con.Close();

        }

        //Send a query to the database using this method

        public void ExecuteQueries(string Query_)
        {
            SqlCommand cmd = new SqlCommand(Query_, con);
            cmd.ExecuteNonQuery();
        }








    }
}
