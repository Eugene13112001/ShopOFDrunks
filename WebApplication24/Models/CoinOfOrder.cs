using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication24.Models
{
    
    public class CoinOfOrder
    {
        public int Id { get; set; }
        public Coin Coin { get; set; }
        public int CoinId { get; set; }
        
        public Order Order { get; set; }
        public int OrderId { get; set; }
        public int Count { get; set; }
        
    }
}
