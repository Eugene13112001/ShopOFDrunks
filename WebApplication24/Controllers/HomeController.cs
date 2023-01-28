using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using WebApplication24.Models;

using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using System;

using System.Diagnostics;
using System.Threading.Tasks;
using WebApplication24.Containers;
namespace WebApplication24.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        
        IShopRepository shop;
        IPayOperateRepository payoperate;
        ICKorzinaRepository korzina;
        ICashRepository cash;
        public HomeController(ILogger<HomeController> logger, IShopRepository shopcont, ICashRepository cash, ICKorzinaRepository korzina, IPayOperateRepository pay)
        {
            this.cash = cash;
            this.korzina = korzina;
            this.payoperate = pay;
            this.shop = shopcont;

            _logger = logger;
        }

        public IActionResult Index()
        {

            return View();
        }


        [HttpPost]
        public IActionResult PutIntoKorzina(int id)
        {

            this.korzina.Add(this.shop.TakeToKorzina(id));
            return Redirect("~/Home/Index");
        }
        public ActionResult GetCashPrice()
        {
            return Json(this.cash.GetPrice());
        }
        public ActionResult GetProducts()
        {

            return Json(shop.GetProducts());
        }
        [HttpPost]
        public ActionResult PayCheck()
        {


            return Json(this.cash.Check(this.korzina.GetPrice()));


        }

        [HttpPost]
        public ActionResult Pay()
        {


            return Json(payoperate.Pay(cash, shop, korzina));

        }
        public ActionResult GetCoins()
        {

            return Json(shop.GetCoins());
        }
        public ActionResult GetActivateCoins()
        {

            return Json(shop.GetActivateCoins());
        }
        public ActionResult GetKorzina()
        {

            return Json(this.korzina.GetProducts());
        }
        public ActionResult GetKorzinaPrice()
        {


            return Json(korzina.GetPrice());
        }
        public ActionResult GetCash()
        {

            return Json(cash.GetCash());
        }
        [HttpPost]
        public IActionResult AddInCash(int item)
        {


            this.cash.Add(this.shop.GetCoin(item));

            return Json(true);
        }

        [HttpPost]
        public ActionResult GetBack(int item)
        {

            korzina.Delete(item);
            shop.GetBack(item);
            return Json(true);
        }





    
    }
}
