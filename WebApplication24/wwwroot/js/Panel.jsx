
class Panel extends React.Component {
    constructor(props) {
        super(props);
        this.coins = this.coins.bind(this);
        this.products = this.products.bind(this);
    }
    coins() {
        var params = window
            .location
            .search
            .replace('?', '')
            .split('&')
            .reduce(
                function (p, e) {
                    var a = e.split('=');
                    p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
                    return p;
                },
                {}
            );
        let y = params['key'];
        let p = "https://localhost:44303/Admin/Coin?key=" + y;
        window.location.replace(p);
    }
    products() {
        var params = window
            .location
            .search
            .replace('?', '')
            .split('&')
            .reduce(
                function (p, e) {
                    var a = e.split('=');
                    p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
                    return p;
                },
                {}
            );
        let y = params['key'];
        let p = "https://localhost:44303/Admin/Products?key=" + y;
        window.location.replace(p);
    }
  
    render() {

        return <div className="main" >
            <div className="mainpanel">
                <h1>Панель администратора: </h1>
            </div>
            <div>
                <div>
                    <button className="addbtn" onClick={this.coins} > Монеты</button>
                </div>

                <div >
                    <button onClick={this.products} className="addbtn"> Товары</button>
                    </div>
                </div>
        </div>;
    }
}

ReactDOM.render(
    <Panel />,
    document.getElementById("content")
);