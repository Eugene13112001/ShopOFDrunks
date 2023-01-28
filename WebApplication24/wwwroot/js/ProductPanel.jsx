class ProductPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            price: this.props.price,
            count: this.props.count,
            image: this.props.image
        }
        this.print = this.print.bind(this);
        this.add = this.add.bind(this);
    }
    add() {

        var xhr = new XMLHttpRequest();

        var body = 'id=' + encodeURIComponent(this.state.id) 
            ;

        xhr.open("POST", '/Home/PutIntoKorzina', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.send(body);

    }
    print() {

        r = this.state.image;
                s = r.image;
                u.push(
                    <div >
                        <img loading="lazy" src={r} loading="lazy"/>
                        <div >
                            <label>{this.state.name}</label>
                        </div>
                        <div >
                            <label>Цена:</label>
                        </div>
                        <div >
                            <label>{this.state.price}</label>
                        </div>
                        <div >
                            <label>Количество:</label>
                        </div>
                        <div >
                            <label>{this.state.count}</label>
                        </div>
                        <div >
                            <button onClick={this.add} >Добавить в корзину</button>
                        </div>
                    </div>);
            


            // u.push(< div > {r[]}</div>);






      

        return <div> {u}</div>;
        //xhr.open('get', '/Home/GetProducts', true);
        // xhr.onload = () => {
        //     const data = JSON.parse(xhr.responseText);
        //    this.setState({ products: data });
        // };

    }
   

    render() {


        return <div>
            {this.print()}
        </div>;
    }
}

ReactDOM.render(
    <MainPanel />,
    document.getElementById("content")
);