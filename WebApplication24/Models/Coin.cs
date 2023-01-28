using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
namespace WebApplication24.Models
{
    public class Coin
    {
        public string CImage { get; set; }
        public int Id { get; set; }
        public string NewImage { get; set; }

        public int Rubl { get; set; }
        public string Image { get; set; }
        public int Count { get; set; }
        public bool Active { get; set; }
        public List<CoinOfOrder> CoinOfOrders { get; set; }
    }
}
