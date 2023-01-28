using System;
using WebApplication24.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication24.ViewModel;
namespace WebApplication24.Containers
{
    public interface ICashRepository
    {
        void Add(Coin b);
        void Pay();
      
        bool Check(int money);
       
        public List<CoinView> GetCash();
        int GetPrice();
        int GetSdacha(int summa);
        public Cash GetCashToDict();


    }

    public class CashInject :   ICashRepository
    {
        private Cash cash = new Cash();
      
        public void Add(Coin coin)
        {
            bool a = false;
            foreach (Coin i in cash.coins.Keys.ToList<Coin>())
            {
                if (i.Id == coin.Id)
                {
                    a = true;
                    cash.coins[i] += 1;
                }

            }
            if (a == false)
            {
                cash.coins[coin] = 1;
            }
            cash.sum += coin.Rubl;
        }
        public void Pay()
        {
            cash.sum = 0;
            cash.coins = new Dictionary<Coin, int>();

        }
        public List<CoinView> GetCash()
        {
            List<CoinView> a = new List<CoinView>();
            foreach (Coin coin in cash.coins.Keys)
            {
                for (int i = 0; i < cash.coins[coin]; i++)
                {

                    CoinView coinview = new CoinView();
                    coinview.Id = coin.Id;
                    coinview.Image = coin.Image;
                    a.Add(coinview);
                }
            }
            return a;
        }
        public Cash GetCashToDict()
        {
            
            return cash;
        }
        public int GetPrice()
        {

            return this.cash.sum;
        }
        public int GetSdacha(int summa)
        {

            return (this.cash.sum - summa);
        }
        public bool Check(int money)
        {
            if (money > this.cash.sum)
            {
                return false;
            }
            return true;
        }
    
      

    }
}
