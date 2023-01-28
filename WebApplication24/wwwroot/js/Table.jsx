class ProductPanel extends React.Component {
    constructor(props) {
        super(props);


        this.delete = this.delete.bind(this);
        this.props = props;
        this.change = this.change.bind(this);

    }
    componentWillReceiveProps(props) {

        this.props = props;
    }
    delete() {

        var formData = new FormData();
        var xhr = new XMLHttpRequest();
        formData.append('item', this.props.id);
        xhr.open('post', '/Admin/Activate', false);
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


        formData.append('key', params['key']);
        xhr.open('post', '/Admin/Delete', false);
        let data;
        xhr.onload = () => {
            const datas = JSON.parse(xhr.responseText);
            data = datas;
            if (data == true) {
                this.props.labelon();

            }
            else {

            }

        };

        xhr.send(formData);
    }

    change() {
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
        let p = "https://localhost:44303/Admin/Redirect?item=" + this.props.id + "&key=" + y;
        window.location.replace(p);
    }


    render() {


        return <tr>
            <td className="label">
                <div className="mainl">
                    <label>{this.props.numb}</label>
                </div>
            </td>


            <td className="label">
                <div className="mainl">
                    <label>{this.props.name}</label>
                </div>
            </td>
            <td className="label">
                <div className="mainl" >
                    <label>{this.props.count}</label>
                </div>
            </td>
            <td className="label">
                <div className="mainl">
                    <label>{this.props.price}</label>
                </div>
            </td>
            <td className="label">
                <div className="mainl">
                    <button onClick={this.change} > Изменить</button>
                    <button onClick={this.delete} > Удалить</button>
                </div>
            </td>
        </tr>;
    }
}
class Table extends React.Component {
    constructor(props) {
        super(props);
        this.getProducts = this.getProducts.bind(this);
        this.head = this.head.bind(this);
        this.add = this.add.bind(this);
        this.body = this.body.bind(this);
        this.labeloff = this.labeloff.bind(this);
        this.labelon = this.labelon.bind(this);
        this.getlab = this.getlab.bind(this);
        this.update = this.update.bind(this);
        this.back = this.back.bind(this);
        let y = this.getProducts();
        this.state = {
            products: y,
            label: []

        };


    }
    labelon() {
        let y = this.getProducts();
        let a = [];
        a.push(<div className="error"><label> Запись успешно удалена</label></div>);
        this.setState({
            products: y,
            label: a,
        });
    }
    labeloff() {
        let a = [];

        this.setState({
            label: a,
        });
    }
    getlab() {
        return this.state.label;
    }
    back() {
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
        let p = "https://localhost:44303/Admin/Panel?key=" + y;
        window.location.replace(p);
    }
    add() {
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
        let p = "https://localhost:44303/Admin/Add?key=" + y;
        window.location.replace(p);
    }
    update() {
        let y = this.getProducts();
        this.setState({ products: y });

    }
    head() {
        let u = [];
        u.push(<tr>
            <th>Номер</th>

            <th>Название</th>
            <th>Количество</th>
            <th>Цена</th>
            <th>Цена</th>

        </tr>);
        return u;
    }
    body() {
        let u = this.state.products;
        let r = [];
        for (let i = 0; i < u.length; i++) {
            let y = u[i];
            r.push(<ProductPanel labelon={this.labelon} update={this.update} id={y.id} numb={i + 1} name={y.name} count={y.count} price={y.price} />);
        }

        return r;
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
    render() {

        return <div className="mainl" >

            <table>
                <thead>{this.head()} </thead>
                <tbody> {this.body()} </tbody>
            </table>
            <div className="mainl">
                <button className="addbtn" onClick={this.add} > Добавить</button>
            </div>
            <div className="backl">
                <button onClick={this.back} className="addbtn"> Назад</button>
            </div>
            <div>
                {this.getlab()}
            </div>
        </div>;
    }
}

ReactDOM.render(
    <Table />,
    document.getElementById("content")
);