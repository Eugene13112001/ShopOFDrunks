class CoinPanel extends React.Component {
    constructor(props) {
        super(props);


        this.active = this.active.bind(this);
        this.props = props;
        this.add = this.add.bind(this);
        this.getcheck = this.getcheck.bind(this);
        this.change = this.change.bind(this);
       
    }
    getcheck() {

        let u = [];
        if (this.props.active == true) {
            u.push(<input onClick={this.active} type="checkbox" checked />);
        }
        else {
            u.push(<input onClick={this.active} type="checkbox"  />);
        }
        return u;
    }
    componentWillReceiveProps(props) {

        this.props = props;
    }
    active() {
        if (this.props.active == true) {
            let a = 0;
            let b = true;
            

            if (this.props.kol != 1) {
                var formData = new FormData();
                var xhr = new XMLHttpRequest();
                formData.append('item', this.props.id);
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
                xhr.open('post', '/Admin/Activate', false);
                let data;
                xhr.onload = () => {
                    const datas = JSON.parse(xhr.responseText);
                    data = datas;
                    if (data == true) {

                        this.props.update();
                    }
                    else {

                    }

                };
                xhr.send(formData);
            }
            else {
                this.props.labelon();
            }
        }
        else {
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
            let data;
            xhr.onload = () => {
                const datas = JSON.parse(xhr.responseText);
                data = datas;
                if (data == true) {

                    this.props.update();
                }
                else {

                }

            };
            xhr.send(formData);
        }
      
    }
    add() {

        var formData = new FormData();
        var xhr = new XMLHttpRequest();
        formData.append('item', this.props.id);
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
        xhr.open('post', '/Admin/AddCoin', false);
        let data;
        xhr.onload = () => {
            const datas = JSON.parse(xhr.responseText);
            data = datas;
            if (data == true) {
               
                this.props.update();
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

        let s = this.props.image;
        return <tr>
            <td className="label">
                <div className="mainl">
                    <img loading="lazy" src={ s} />
                </div>
            </td>


          
            <td className="label">
                <div className="mainl">
                    <label>{this.props.count}</label>
                </div>
            </td>
            <td className="label">
                <div className="mainl">
                    <button onClick={this.add} > Добавить</button>
                </div>
            </td>
            <td className="label">
                <div className="mainl">

                    {this.getcheck()}
                </div>
            </td>
        </tr>;
    }
}
class AdminCoins extends React.Component {
    constructor(props) {
        super(props);
        this.getCoins = this.getCoins.bind(this);
        this.head = this.head.bind(this);
        this.add = this.add.bind(this);
        this.back = this.back.bind(this);
        this.body = this.body.bind(this);
        this.update = this.update.bind(this);
        this.labelon = this.labelon.bind(this);
        this.getlab = this.getlab.bind(this);
        let y = this.getCoins();
        this.state = {
            coins: y,
            lines : [] ,

        };


    }
    labelon() {
        let a = [];
        a.push(<div className="error"><label> Хотя бы одна монета должна быть активирована</label></div>);
        this.setState({ lines: a }
        );
    }
    getlab() {
        return this.state.lines;
    }
    head() {
        let u = [];
        u.push(<tr>
            <th>Монета</th>
            <th>Количество</th>
            <th>Добавить</th>
            <th>Доступна</th>

        </tr>);
        return u;
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
        let y = this.getCoins();
        this.setState({
            coins: y,
            lines : [],
        });

    }
    
    body() {
        let u = this.state.coins;
        let r = [];
        let v = 0;
        for (let i = 0; i < u.length; i++) {
            let y = u[i];
            if (y.active == true) {
                v += 1;
            }
        }
        for (let i = 0; i < u.length; i++) {
            let y = u[i];
            r.push(<CoinPanel labelon={this.labelon} kol={v} update={this.update} id={y.id} numb={i + 1} count={y.count} active={y.active} image={y.image} />);
        }

        return r;
    }

    getCoins() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/Admin/GetCoins', false);
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
    render() {

        return <div className="mainl">
            <table>
                <thead>{this.head()} </thead>
                <tbody> {this.body()} </tbody>
            </table>
            <div className="mainl">
                <button onClick={this.back} className="addbtn"> Назад</button>
            </div>
            {this.getlab()}
        </div>;
    }
}

ReactDOM.render(
    <AdminCoins />,
    document.getElementById("content")
);