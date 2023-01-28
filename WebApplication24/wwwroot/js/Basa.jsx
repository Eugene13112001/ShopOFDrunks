class ProductPanel extends React.Component {
    constructor(props) {
        super(props);

        this.print = this.print.bind(this);
        this.add = this.add.bind(this);
        this.props = props;
        this.btncheck = this.btncheck.bind(this);
    }
    componentWillReceiveProps(props) {

        this.props = props;
    }
    add() {

        var xhr = new XMLHttpRequest();

        var body = 'id=' + encodeURIComponent(this.props.id)
            ;

        xhr.open("POST", '/Home/PutIntoKorzina', false);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.send(body);
        this.props.update();

    }
    btncheck(kol) {
        let u = [];
        if (kol == 0) {
            u.push('Товар отсутствует');
            return u;
        }
        else {
            u.push(<button className="buybutton" onClick={this.add} >Добавить в корзину</button>);
            return u;

        }
    }
    print() {
        let u = [];
        let r = this.props.image;
        let s = r;
        u.push(
            <div className="imgcentr">
                <img loading="lazy" src={s} /> </div>);
        u.push(
            <div className="lab">
                <label>{this.props.name}</label>
            </div>);
        u.push(
            <div className="lab" >
                <label>Цена:</label>
            </div>);
        u.push(
            <div className="lab">
                <label>{this.props.price}</label>
            </div>);
        u.push(
            <div className="lab" >
                <label>Количество:</label>
            </div>);
        u.push(
            <div className="lab" >
                <label>{this.props.count}</label>
            </div>);
        u.push(
            <div>
                {this.btncheck(this.props.count)}
            </div>);


        return <div> {u} </div>;


    }


    render() {


        return <div className="product" >
            {this.print()}
        </div>
            ;
    }
}
class Korzina extends React.Component {
    constructor(props) {
        super(props);

        this.print = this.print.bind(this);

        this.props = props;
        this.printprice = this.printprice.bind(this);
    }
    componentWillReceiveProps(props) {

        this.props = props;
    }

    print() {
        let u = [];
        let r = this.props.korzina;
        if (r.length == 0) {
            u.push(<h2>Пусто</h2>)
        }
        for (let i = 0; i < r.length; i++) {

            let del = function del() {
                var xhr = new XMLHttpRequest();

                var body = 'item=' + encodeURIComponent(r[i].id)
                    ;

                xhr.open("POST", '/Home/GetBack', false);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

                xhr.send(body);
                this.props.update();
            };
            this.del = del.bind(this);
            let s = r[i].image;
            u.push(
                <div className="product" >
                    <div className="imgcentr">
                        <img loading="lazy" src={s} />
                    </div>
                    <div class="lab" >
                        <label>{r[i].name}</label>
                    </div>
                    <div class="lab" >
                        <label>Цена:</label>
                    </div>
                    <div class="lab" >
                        <label>{r[i].price}</label>
                    </div>

                    <div class="lab">
                        <button onClick={this.del} >Удалить</button>
                    </div>
                </div>);

        }


        return <div className="products"> {u}</div>;


    }
    printprice() {

        return <div><div >
            <h2>Необходимая для покупки сумма:</h2>


        </div>
            <div>
                <h2>{this.props.price} руб.</h2>


            </div></div>;
    }

    render() {


        return <div className="korzina" >
            <div className="panelname" >
                <h2>Корзина:</h2>


            </div>
            {this.print()}

            <div className="panelname" >
                <h2>Необходимая для покупки сумма:</h2>


            </div>
            <div className="panelname">
                <h2>{this.props.price} руб.</h2>


            </div>

        </div>;
    }
}

class MainPanel extends React.Component {
    constructor(props) {
        super(props);
        this.update = this.update.bind(this);
        this.getCoins = this.getCoins.bind(this);
        this.getProducts = this.getProducts.bind(this);
        this.PrintProducts = this.PrintProducts.bind(this);
        this.PrintCoins = this.PrintCoins.bind(this);
        this.getKorzina = this.getKorzina.bind(this);
        this.PrintSdacha = this.PrintSdacha.bind(this);
        this.getKorzinaPrice = this.getKorzinaPrice.bind(this);
        this.getCashPrice = this.getCashPrice.bind(this);
        this.updateKorzina = this.updateKorzina.bind(this);
        this.getCash = this.getCash.bind(this);
        this.PrintCash = this.PrintCash.bind(this);
        let products = this.getProducts();
        let coins = this.getCoins();
        let korzina = this.getKorzina();
        let korzinaprice = this.getKorzinaPrice();
        let mcash = this.getCash();
        let pricecash = this.getCashPrice();
        this.labelempty = this.labelempty.bind(this);
        this.labelmoney = this.labelmoney.bind(this);
        this.getlab = this.getlab.bind(this);
        this.PayButton = this.PayButton.bind(this);
        this.state = {
            korzina: korzina,
            products: products,
            coins: coins,
            sdachaprice: 0,
            korzinaprice: korzinaprice,
            cash: mcash,
            casprice: pricecash,
            sdacha: [],
            label: [],
        }
    }
    labelempty() {
        let a = [];
        a.push(<div className="error"><label> Корзина пустая</label></div>);
        this.setState({
            label: a,
        });
    }
    labelmoney() {
        let a = [];
        a.push(<div className="error"><label> Недостаточно денег</label></div>);
        this.setState({
            label: a,
        });
    }
    getlab() {
        return this.state.label;
    }
    getCashPrice() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/Home/GetCashPrice', false);
        let u = [];
        let r = 0;
        let s = 0;
        xhr.onload = () => {
            r = JSON.parse(xhr.responseText);

        };

        xhr.send();

        return r;

    }
    updateKorzina() {

        let korz = this.getKorzina();
        let pr = this.getKorzinaPrice();

        this.setState({

            korzina: korz,
            korzinaprice: pr
        })
    }
    getKorzinaPrice() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/Home/GetKorzinaPrice', false);
        let u = [];
        let r = 0;
        let s = 0;
        xhr.onload = () => {
            r = JSON.parse(xhr.responseText);





        };

        xhr.send();

        return r;


    }
    getKorzina() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/Home/GetKorzina', false);
        let u = [];
        let r = 0;
        let s = 0;
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText);

            for (let i = 0; i < data.length; i++) {

                r = data[i];


                u.push(
                    r
                );
            }



        };

        xhr.send();

        return u;


    }
    update() {
        let products = this.getProducts();
        let korz = this.getKorzina();
        let price = this.getKorzinaPrice();
        let mcash = this.getCash();
        let y = this.getCashPrice();
        this.setState({
            products: products,
            korzina: korz,
            korzinaprice: price,
            cash: mcash,
            casprice: y
        });

    }
    PrintProducts() {
        let r = 0;
        let s = 0;
        let u = [];
        let data = this.state.products;
        for (let i = 0; i < data.length; i++) {

            r = data[i];
            s = r.image;

            u.push(<ProductPanel update={this.update} image={r.image} id={r.id} name={r.name} price={r.price} count={r.count} />
            );
        }

        return <div className="products">{u}</div>;

    }
    getProducts() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/Home/GetProducts', false);
        let u = [];
        let r = 0;
        let s = 0;
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText);

            for (let i = 0; i < data.length; i++) {

                r = data[i];


                u.push(
                    r
                );
            }



        };

        xhr.send();

        return u;


    }
    getCash() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/Home/GetCash', false);
        let u = [];
        let r = 0;
        let s = 0;
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText);

            for (let i = 0; i < data.length; i++) {

                r = data[i];


                u.push(
                    r
                );
            }



        };

        xhr.send();

        return u;


    }
    getCoins() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/Home/GetActivateCoins', false);
        let u = [];
        let r = 0;
        let s = 0;
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText);

            for (let i = 0; i < data.length; i++) {

                r = data[i];
                s = r.image;
                u.push(
                    r);
            }



        };

        xhr.send();

        return u;


    }
    PrintSdacha() {
        let u = [];
        let data = this.state.sdacha;
        for (let i = 0; i < data.length; i++) {
            let r = data[i];


            let s = r.image;
            u.push(
                <div>


                    <img loading="lazy" src={s} />
                </div>);
        }


        return <div><h2>Сдача: </h2> <h2>{this.state.sdachaprice} руб.</h2><div className="coins">{u}</div></div>;

    }
    PrintCash() {


        let u = [];
        u.push(<div className="cash"><h2>Внесенная сумма:</h2> <h2>{this.state.casprice} руб.</h2></div>);
        let r = 0;
        let s = 0;
        let y = [];
        let data = this.state.cash;
        for (let i = 0; i < data.length; i++) {
            r = data[i];



            s = r.image;
            y.push(
                <div>


                    <img loading="lazy" src={s} />
                </div>);
        }

        u.push(<div className="caschoins">{y}</div>);
        return <div className="caschoins">{u}</div>;


    }
    PayButton() {

        let pay = function pay() {
            if (this.state.korzinaprice == 0) {
                this.labelempty();
            }
            else {


                let data;
                let sdacha = [];
                const xhr = new XMLHttpRequest();
                xhr.open('post', '/Home/PayCheck', false);

                xhr.onload = () => {
                    const datas = JSON.parse(xhr.responseText);
                    data = datas;

                };

                xhr.send();
                if (data == true) {
                    const xhr = new XMLHttpRequest();
                    xhr.open('post', '/Home/Pay', false);
                    xhr.onload = () => {
                        const datas = JSON.parse(xhr.responseText);
                        sdacha = datas;



                    };
                    xhr.send();
                    let razn = this.state.casprice - this.state.korzinaprice;
                    this.setState({
                        sdachaprice: razn,
                        sdacha: sdacha,
                        cash: [],
                        label: [],
                        korzina: [],
                        casprice: 0,
                        korzinaprice: 0
                    });
                }
                else {
                    this.labelmoney();
                }
            }
        };
        let u = [];
        this.pay = pay.bind(this);
        u.push(<div><button className="buybutton" onClick={this.pay} >Купить </button> </div>);
        return u;
    }
    PrintCoins() {


        let u = [];
        let r = 0;
        let s = 0;
        let data = this.state.coins;
        for (let i = 0; i < data.length; i++) {
            r = data[i];
            let add = function add() {
                var xhr = new XMLHttpRequest();
                r = data[i];
                var body = 'item=' + encodeURIComponent(r.id)
                    ;

                xhr.open("POST", '/Home/AddInCash', false);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

                xhr.send(body);
                this.update();
            };
            this.add = add.bind(this);

            s = r.image;
            u.push(

                <button className="coin" onClick={this.add}>

                    <img loading="lazy" src={s} />
                </button>);
        }


        return <div className="coins">{u}</div>;


    }

    render() {


        return <div className="main">
            <div className="mainpanel"> <div className="label">
                <div>
                    <h1>Продукты:</h1>
                </div>
            </div> {this.PrintProducts()} </div>

            <Korzina korzina={this.state.korzina} price={this.state.korzinaprice} update={this.update} />
            <div className="panelcoins">
                <div class="panelname">
                    <h2>Доступные для оплаты монеты:</h2>


                </div>
                {this.PrintCoins()}


                <div>  {this.PrintCash()} </div>
                {this.PayButton()}
                {this.PrintSdacha()}
                {this.getlab()}
            </div>

        </div>;
    }
}

ReactDOM.render(
    <MainPanel />,
    document.getElementById("content")
);