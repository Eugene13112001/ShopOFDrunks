using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication24.Models;
using WebApplication24.ViewModel;
namespace WebApplication24.Containers
{
    public interface IPayOperateRepository
    {
        public List<CoinView> Pay(ICashRepository cash, IShopRepository shop, ICKorzinaRepository korzina);
    }

    public class PayOperate :  IPayOperateRepository
    {
       
    

        public List<CoinView> Pay( ICashRepository cash , IShopRepository shop , ICKorzinaRepository korzina)
        {
            shop.AddOrder(cash, korzina);
            List<CoinView> sdacha = this.Sdacha(cash.GetSdacha(korzina.GetPrice()) , shop);
            shop.PutCash(cash.GetCash());
            shop.DeleteCoins(sdacha);
            cash.Pay();
            korzina.DeleteAll();

            return sdacha;

        }
       
        List<CoinView> Sdacha(int price , IShopRepository shop)
        {
            List<CoinView> sdacha = new List<CoinView>();
            List<Coin> list = shop.GetCoins();

            list.Sort(delegate (Coin x, Coin y)
            {
                if (x.Rubl > y.Rubl) return -1;

                else return 1;

            });
            int i = 0;
            while ((i < list.Count) && (price > 0))
            {
                int rubl = list[i].Rubl;
                int count = price / rubl;
                int r = 0;
                if (count > list[i].Count)
                {
                    price -= list[i].Count * list[i].Rubl;
                    r = list[i].Count;
                }
                else
                {
                    price -= count * list[i].Rubl;
                    r = count;
                }
                for (int j = 0; j < r; j++)
                {
                    CoinView coinview = new CoinView();
                    coinview.Id = list[i].Id;
                    coinview.Image = list[i].Image;
              
                    sdacha.Add(coinview);
                }
                i += 1;
            }
            return sdacha;
        }
       

    }
}
