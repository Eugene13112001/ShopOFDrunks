using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication24.Models
{
    public class Korzina
    {
        public  Dictionary<Product , int> products;
        public int price;
        public Korzina()
        {

            price = 0;
            products = new Dictionary<Product, int>();
        }
     
    }
}
