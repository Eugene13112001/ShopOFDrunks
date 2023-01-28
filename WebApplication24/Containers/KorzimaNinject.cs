using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication24.Models;
namespace WebApplication24.Containers
{
    public interface ICKorzinaRepository
    {
        public void Add(Product product);
       
        
        public bool Check();
       
        public void Delete(int id);
      
        public void DeleteAll();
        public Korzina GetProductsTodict();
        public int GetPrice();

        public List<Product> GetProducts();
        


    }

    public class KorzinaInject :  ICKorzinaRepository
    {
        private Korzina korz = new Korzina();
      
        public void Add(Product product)
        {
            bool a = false;
            foreach (Product i in korz.products.Keys.ToList<Product>())
            {
                if (i.Id == product.Id)
                {
                    a = true;
                    korz.products[i] += 1;
                }

            }
            if (a==false)
            {
                korz.products[product] = 1;
            }
               

            korz.price += product.Price;

        }
        public bool Check()
        {
            if (korz.products.Keys.Count == 0)
            {
                return false;
            }
            else
            {
                return true;
            }

        }
        public void Delete(int id)
        {
            Product pr = new Product();
            foreach (Product prod in korz.products.Keys)
            {
                if (id == prod.Id)
                {
                    korz.products[prod] -= 1;
                    pr = prod;
                }
            }
            korz.price -= pr.Price;


        }

        public void DeleteAll()
        {

            korz.price = 0;
            korz.products = new Dictionary<Product, int>();

        }
        public int GetPrice()
        {

            return korz.price;
        }
        public List<Product> GetProducts()
        {
           
            List<Product> a = new List<Product>();
            foreach (Product product in korz.products.Keys)
            {
                for (int i = 0; i < korz.products[product]; i++)
                {

                    a.Add(product);
                }
            }
            return a;
        }
        public Korzina  GetProductsTodict()
        {

            
            return korz;
        }
     

    }
}
