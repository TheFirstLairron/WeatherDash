using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WeatherDash.DataAccess;
using WeatherDash.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WeatherDash.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private UserAccess Access;

        public UserController(UserAccess access)
        {
            Access = access;
        }

        [HttpGet("{name}")]
        public string[] GetUserCities(string name)
        {
            return Access.GetUserCities(name);
        }

        [HttpPost("add")]
        public void AddCityToUser([FromBody] User user)
        {
            Access.AddCityToUser(user.name, user.city);
        }

        [HttpPost("delete")]
        public void RemoveCityFromUser([FromBody]User user)
        {
            Access.RemoveCityFromUser(user.name, user.city);
        }
    }
}
