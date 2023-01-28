using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System;
using System.IO;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using WebApplication24.Models;
using WebApplication24.Containers;
namespace WebApplication24.ViewModel
{
    public class ProductView
    {
    
        public string Name { get; set; }

        public int Count { get; set; }

        public int Price { get; set; }


        public IFormFile  bit { get; set; }
    }
}
