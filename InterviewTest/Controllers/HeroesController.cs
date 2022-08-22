using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InterviewTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HeroesController : ControllerBase
    {
        private Hero[] heroes = new Hero[] {
               new Hero()
               {
                   id= "1",
                   name= "Hulk",
                   power="Strength from gamma radiation",
                   stats=
                   new List<KeyValuePair<string, int>>()
                   {
                       new KeyValuePair<string, int>( "strength", 5000 ),
                       new KeyValuePair<string, int>( "intelligence", 50),
                       new KeyValuePair<string, int>( "stamina", 2500 )
                   }
               }
            };


        [HttpGet]
        public IEnumerable<Hero> Get()
        {
            return this.heroes;
        }

        [HttpGet("{id}", Name = "Get")]
        public Hero Get(int id)
        {
            return this.heroes.FirstOrDefault();
        }

        [HttpPost]
        public Hero Post([FromBody] Hero hero = null)
        {
            Hero heroObj = new Hero();

            heroObj.stats = hero.stats;

            heroObj.evolve();

            hero.stats = heroObj.stats;

            return hero;
        }

        [HttpPut("{id}")]
        public Hero Put(int id, [FromBody] Hero hero)
        {

            Hero heroObj = new Hero();

            heroObj.stats = hero.stats;

            heroObj.evolve();

            hero.stats = heroObj.stats;

            return hero;
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
