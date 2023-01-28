using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication24.Models
{
    public class Cash
    {
        public int sum;
        public Dictionary<Coin, int> coins;
        public Cash()
        {
            sum = 0;
            coins = new Dictionary<Coin , int>();


        }
        
       
       
    }
}
