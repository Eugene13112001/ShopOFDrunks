using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication24.Models;
using Microsoft.AspNetCore.Mvc;
using System.Drawing;
using System.Drawing.Imaging;
using System.Linq;
using System;
using System.IO;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using WebApplication24.Models;
using WebApplication24.ViewModel;

namespace WebApplication24.Containers
{
    public interface IShopRepository
    {
        public void AddOrder(ICashRepository cash, ICKorzinaRepository korzina);
        public Product GetProduct(int item);
        public ProductBasa GetProductForView(int item);
        public Coin GetCoin(int item);
        public Product TakeToKorzina(int id);
        public void PutCash(List<CoinView> cash);
        public List<ProductBasa> GetProducts();


        public void Activate(int item);
        void DeleteCoins(List<CoinView> coins);
        public void AddCoin(int item);
        public List<Coin> GetCoins();
        public void Delete(int item);
        public void AddProd(ProductView pr);
        public void GetBack(int item);
        public List<CoinView> GetActivateCoins();
        public void RedirectProd(ProductRedirectView prod);
    }

    public class ShopInject :  IShopRepository
    {
        ShopContext shop;
        
        public ShopInject(ShopContext shopcont)
        {
            this.shop = shopcont;
         
            if (!this.shop.Coins.Any())
            {


               
                this.shop.Coins.AddRange(
                new Coin
                {
                    Count = 50,
                    Rubl = 1,
                    Active = true,
                    Image = "/images/1.png"
                } ,
                new Coin
                {
                    Count = 50,
                    Rubl = 2,
                    Active = true,
                    Image = "/images/2.png"
                } ,
                new Coin
                {
                    Count =50,
                    Rubl = 5,
                    Active = true,
                    Image = "/images/5.png"
                },
                new Coin
                {
                    Count = 50,
                    Rubl = 10,
                    Active = true,
                    Image = "/images/10.png"
                }
                );

                this.shop.SaveChanges();
            }
            if (!this.shop.Products.Any())
            {



                this.shop.Products.AddRange(
                new Product
                {
                    Count = 20,
                    Name = "Спрайт",
                    Price = 15,
                    Image = "/images/Спрайт.png"
                },
                new Product
                {
                    Count = 20,
                    Name = "Кола",
                    Price = 10,
                    Image = "/images/Кола.png"
                },
                 new Product
                 {
                     Count = 20,
                     Name = "Пепси",
                     Price = 20,
                     Image = "/images/Пепси.png"
                 }
              
                );

                this.shop.SaveChanges();
            }





        }
        public Product TakeToKorzina(int id)
        {
            Product product = shop.Products.FirstOrDefault<Product>(pr => pr.Id == id);

            product.Count -= 1;
            shop.SaveChanges();
            return product;
        }
        public void  AddOrder( ICashRepository cash, ICKorzinaRepository korzina)
        {


            Order order = new Order();
            order.SUMMA = korzina.GetPrice();
            shop.Orders.Add(order);
            shop.SaveChanges();
            int id= order.Id;
            Cash cas = cash.GetCashToDict();
            foreach (Coin i in cas.coins.Keys)
            {
                CoinOfOrder coinoforder= new CoinOfOrder();
                coinoforder.CoinId = i.Id;
                coinoforder.OrderId = id;
                coinoforder.Count = cas.coins[i];
                shop.CoinsOfOrders.Add(coinoforder);
            }
            shop.SaveChanges();
            Korzina  kor = korzina.GetProductsTodict();
            foreach (Product i in kor.products.Keys)
            {
                ProductsOfOrder prodoforder = new ProductsOfOrder();
                prodoforder.ProductId = i.Id;
                prodoforder.OrderId = id;
                prodoforder.Count = kor.products[i];
                shop.ProductsOfOrder.Add(prodoforder);
            }
            shop.SaveChanges();


        }
        public void AddCoin(int item)
        {


                Coin coi = this.GetCoin(item); ;
                coi.Count += 1;
                shop.SaveChanges();
              
           

        }
       
       public List<ProductBasa> GetProducts()
        {
            List<Product> a = this.shop.Products.ToList<Product>();
            List<ProductBasa> b = new List<ProductBasa>();
            foreach (Product i in a)
            {

                ProductBasa c = new ProductBasa()
                {

                    Id = i.Id,
                    Count = i.Count,
                    Name = i.Name,
                    Image = i.Image,
                    Price = i.Price
                };
                b.Add(c);
            }

            return b;
        }
       
        async public void AddProd(ProductView pr)
        {
            Product prod = new Product();
            prod.Name = pr.Name;
            prod.Price = pr.Price;
            prod.Count = pr.Count;
            string path = $"/images/{prod.Name}.png";


            prod.Image = path;
            this.shop.Products.Add(prod);
            using (var memoryStream = new MemoryStream())
            {
                await pr.bit.CopyToAsync(memoryStream);
                using (var img = Image.FromStream(memoryStream))
                {

                    img.Save("wwwroot" + prod.Image);
                }
            }
            shop.SaveChanges();
        }
        async public void RedirectProd(ProductRedirectView prod)
        {
            Product pr = this.GetProduct(prod.id);


            pr.Name = prod.Name;
            pr.Price = prod.Price;
            pr.Count = prod.Count;
            string path = $"/images/{prod.Name}.png";


            pr.Image = path;
          
            using (var memoryStream = new MemoryStream())
            {
                await prod.bit.CopyToAsync(memoryStream);
                using (var img = Image.FromStream(memoryStream))
                {
                    
                    img.Save("wwwroot" + pr.Image);
                }
            }
            shop.SaveChanges();
        }
        public List<CoinView> GetActivateCoins()
        {
            List<CoinView> a = new List<CoinView>();
            foreach (Coin coin in shop.Coins.ToList<Coin>())
            {
                if (coin.Active == true)
                {
                    CoinView coinview = new CoinView();
                    coinview.Id = coin.Id;
                    coinview.Image = coin.Image;
                    a.Add(coinview);
                }
            }
            return a;
        }
        public List<Coin> GetCoins()
        {
           
            return this.shop.Coins.ToList<Coin>();
        }
        public void PutCash(List<CoinView> cash)
        {
            foreach (CoinView coi in cash)
            {

                Coin coin = shop.Coins.Where(item => item.Id == coi.Id).FirstOrDefault();
                coin.Count += 1;

            }

            shop.SaveChanges();
        }
        public Coin GetCoin(int item)
        {

            Coin coi = new Coin();
            coi = shop.Coins.FirstOrDefault<Coin>(ite => ite.Id == item);
         
           
            return coi;
        }
        public ProductBasa GetProductForView(int item)
        {

            Product pr = new Product();
            pr = shop.Products.FirstOrDefault<Product>(ite => ite.Id == item);
            ProductBasa prod = new ProductBasa()
            {
                Id = pr.Id,
                Name = pr.Name,
                Count = pr.Count,
                Price = pr.Price,
                Image = pr.Image
            };


            return prod;
        }
        public Product GetProduct(int item)
        {

            Product pr = new Product();
            pr = shop.Products.FirstOrDefault<Product>(ite => ite.Id == item);
           
           

            return pr;
        }
        public void GetBack(int item)
        {

           
            Product pr = shop.Products.Where(c => c.Id == item).FirstOrDefault();
            pr.Count += 1;
            shop.SaveChanges();
            
        }
        public void DeleteCoins(List<CoinView> coins)
        {
            foreach (CoinView c in coins)
            {

                Coin coin = shop.Coins.Where(item => item.Id == c.Id).FirstOrDefault();
                coin.Count -= 1;
            }
            shop.SaveChanges();
        }
        public void  Delete(int item)
        {
           
            Product pr = shop.Products.FirstOrDefault<Product>(ite => ite.Id == item);
            
            List<CoinOfOrder> coinoforders = new List<CoinOfOrder>();
            List<ProductsOfOrder> productoforders = new List<ProductsOfOrder>();
            foreach (ProductsOfOrder productoforder in shop.ProductsOfOrder.ToList<ProductsOfOrder>())
            {

                if (productoforder.ProductId == pr.Id)
                {
                   
                    productoforders.Add(productoforder);
                }
            }
           
            shop.ProductsOfOrder.RemoveRange(productoforders);
            shop.SaveChanges();

            shop.Products.Remove(pr);
            
            shop.SaveChanges();
            
        }
        public void  Activate(int item )
        {
            
            Coin pr = this.GetCoin(item);
            if (pr.Active == false)
            {
                pr.Active = true;
            }
            else
            {
                pr.Active = false;
            }
            shop.SaveChanges();
          
        }
       

    }
}
