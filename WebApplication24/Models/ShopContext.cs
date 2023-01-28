using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
namespace WebApplication24.Models
{
    public class ShopContext : DbContext
    {

            public DbSet<Coin> Coins { get; set; }
            public DbSet<Product> Products { get; set; }

             public DbSet<Order> Orders { get; set; }
        public DbSet<CoinOfOrder> CoinsOfOrders { get; set; }
        public DbSet<ProductsOfOrder> ProductsOfOrder { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Order>()
       .HasMany(c => c.ProductsOfOrders).WithOne(c => c.Order);
            modelBuilder.Entity<Product>()
       .HasMany(c => c.ProductsOfOrders).WithOne(c => c.Product);

            modelBuilder.Entity<Order>()
       .HasMany(c => c.CoinOfOrders).WithOne(c => c.Order);
            modelBuilder.Entity<Coin>()
       .HasMany(c => c.CoinOfOrders).WithOne(c => c.Coin);

        }
        public ShopContext(DbContextOptions<ShopContext> options)
                : base(options)
            {
        
            }
        
    }
}
