using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeatherDash.Models;
using System.Data.SqlClient;

namespace WeatherDash.DataAccess
{
    public class UserAccess
    {
        private string ConnectionString { get; set; }

        public UserAccess(string connectionString)
        {
            ConnectionString = connectionString;
        }

        public string[] GetUserCities(string name)
        {
            List<string> results = new List<string>();
            using (SqlConnection connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                using (SqlCommand command = connection.CreateCommand())
                {
                    command.CommandText = "Select City from Cities where Name = @Name";
                    command.Parameters.AddWithValue("Name", name);

                    using(SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            while (reader.Read())
                            {
                                results.Add(reader["City"].ToString());
                            }
                        }
                    }
                }
            }

            return results.Distinct().ToArray();
        }

        public void AddCityToUser(string name, string city)
        {
            using (SqlConnection connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                using (SqlCommand command = connection.CreateCommand())
                {
                    command.CommandText = "insert into Cities (Name, City) values (@Name, @City)";
                    command.Parameters.AddWithValue("Name", name);
                    command.Parameters.AddWithValue("City", city);

                    command.ExecuteNonQuery();
                }
            }
        }

        public void RemoveCityFromUser(string name, string city)
        {
            using (SqlConnection connection = new SqlConnection(ConnectionString))
            {
                connection.Open();
                using(SqlCommand command = connection.CreateCommand())
                {
                    command.CommandText = "delete from Cities where Name=@Name and City=@City";
                    command.Parameters.AddWithValue("Name", name);
                    command.Parameters.AddWithValue("City", city);

                    command.ExecuteNonQuery();
                }
            }
        }
    }
}
