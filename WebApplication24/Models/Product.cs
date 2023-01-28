using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.Drawing;
using System.Drawing.Imaging;
namespace WebApplication24.Models
{
    public class Product
    {
        public int Id { get; set; }
        
        public string Name { get; set; }
       
        public int Count { get; set; }
        
        public int Price { get; set; }

     
        public string  Image { get; set; }

        public List<ProductsOfOrder> ProductsOfOrders { get; set; }

    }

}
