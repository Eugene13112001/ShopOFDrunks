using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using WebApplication24.ViewModel;
using System.Threading.Tasks;
using WebApplication24.Containers;
using WebApplication24.Models;
namespace WebApplication24.Controllers
{
    public class AdminController : Controller
    {
        IShopRepository shop;
        string key;
        public AdminController( IShopRepository cont)
        {
            shop = cont;
            this.key = "key";
            
        }
        [HttpGet]
        public IActionResult Add(string key)
        {

            if (this.Check(key) == false)
            {
                return BadRequest("Неверный ключ");
            }
            return View();
        }
        [HttpGet]
        public IActionResult Redirect(string item, string key)
        {
            if (this.Check(key) == false)
            {
                return BadRequest("Неверный ключ");
            }

            return View();
        }
        [HttpGet]
        public IActionResult Products(string key)
        {
            if (this.Check(key) == false)
            {
                return BadRequest("Неверный ключ");
            }
            return View();
        }
        [HttpGet]
        public IActionResult Panel(string key)
        {
            if (this.Check(key) == false)
            {
                return BadRequest("Неверный ключ");
            }
            return View();
        }
        [HttpGet]
        public IActionResult Coin(string key)
        {
            if (this.Check(key) == false)
            {
                return BadRequest("Неверный ключ");
            }
            return View();
        }
        [HttpPost]
        public IActionResult Add(ProductView pr, string key)
        {

            if (this.Check(key) == false)
            {
                return BadRequest("Неверный ключ");
            }

            if (pr.bit == null)
            {
                Dictionary<string, int> dictu = new Dictionary<string, int>();
                dictu["All"] = 1;
                dictu["Name"] = 0;
                dictu["Price"] = 0;
                dictu["Image"] = 1;
                dictu["Count"] = 0;
                return Json(dictu);
            }

            Dictionary<string, int> dict = new Dictionary<string, int>();
            dict = this.CheckProduct(pr);

            if (dict["All"] == 0)
            {
                shop.AddProd(pr);

            }

            return Json(dict);
        }
        [HttpGet]
        public ActionResult GetCoins()
        {

            return Json(shop.GetCoins());
        }
        [HttpPost]
        public IActionResult Activate(int item, string key)
        {
            if (this.Check(key) == false)
            {
                return BadRequest("Неверный ключ");
            }
            shop.Activate(item);
            return Json(true);
        }
        [HttpPost]
        public IActionResult Delete(int item, string key)
        {
            if (this.Check(key) == false)
            {
                return BadRequest("Неверный ключ");
            }
            shop.Delete(item);
            return Json(true);
        }
        [HttpPost]
        public IActionResult GetProduct(int item)
        {

            return Json(shop.GetProductForView(item));
        }
        [HttpPost]
        public IActionResult Redirect(ProductRedirectView pr, string key)
        {
            if (this.Check(key) == false)
            {
                return BadRequest("Неверный ключ");
            }


            if (pr.bit == null)
            {
                Dictionary<string, int> dictu = new Dictionary<string, int>();
                dictu["All"] = 1;
                dictu["Name"] = 0;
                dictu["Price"] = 0;
                dictu["Image"] = 1;
                dictu["Count"] = 0;
                return Json(dictu);
            }

            Dictionary<string, int> dict = new Dictionary<string, int>();
            dict = this.CheckProductRedirect(pr);
            if (dict["All"] == 0)
            {

                shop.RedirectProd(pr);
            }

            return Json(dict);
        }

        [HttpPost]
        public IActionResult AddCoin(int item, string key)
        {
            if (this.Check(key) == false)
            {
                return BadRequest("Неверный ключ");
            }
            try
            {
                shop.AddCoin(item);
                return Json(true);
            }
            catch
            {
                return Json(false);
            }

        }
        bool Check(string key)
        {


            if (this.key == key)
            {
                return true;
            }

            return false;
        }
        Dictionary<string, int> CheckProductRedirect(ProductRedirectView product)
        {
            Dictionary<string, int> dict = new Dictionary<string, int>();
            dict["Name"] = 0;
            dict["Price"] = 0;
            dict["Image"] = 0;
            dict["Count"] = 0;
            if (product.Name == null)
            {

                dict["Name"] = 1;
            }
            if (!((product.Count > 0) && (product.Count < 101)))
            {

                dict["Count"] = 1;
            }
            if (!((product.Price > 0) && (product.Price < 151)))
            {

                dict["Price"] = 1;
            }

            dict["All"] = dict["Price"] + dict["Image"] + dict["Count"] + dict["Name"];
            return dict;
        }
        Dictionary<string, int> CheckProduct(ProductView product)
        {
            Dictionary<string, int> dict = new Dictionary<string, int>();
            dict["Name"] = 0;
            dict["Price"] = 0;
            dict["Image"] = 0;
            dict["Count"] = 0;
            if (product.Name == null)
            {

                dict["Name"] = 1;
            }
            if (!((product.Count > 0) && (product.Count < 101)))
            {

                dict["Count"] = 1;
            }
            if (!((product.Price > 0) && (product.Price < 151)))
            {

                dict["Price"] = 1;
            }

            dict["All"] = dict["Price"] + dict["Image"] + dict["Count"] + dict["Name"];
            return dict;
        }

    }
}
