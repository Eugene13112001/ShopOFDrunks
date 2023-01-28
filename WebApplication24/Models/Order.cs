using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication24.Models
{
    public class Order
    {
        public int Id { get; set; }

        public int SUMMA { get; set; }

        public List<ProductsOfOrder> ProductsOfOrders { get; set; }

        public List<CoinOfOrder> CoinOfOrders { get; set; }
    }
}
