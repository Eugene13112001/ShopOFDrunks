
class RedirectCoins extends React.Component {
    constructor(props) {
        super(props);
        this.head = this.head.bind(this);
        this.main = this.main.bind(this);
        alert('');

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
    main() {
        let u = [];
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/Home/GetCoins', false);
        let u = [];
        let r = 0;
        let s = 0;
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText);

            for (let i = 0; i < data.length; i++) {
                let y = [];
                r = data[i];
                if (r.active == true) {
                    y.push(<input type="checkbox" checked />);
                }
                else {
                    y.push(<input type="checkbox"  />);
                }
                r = data[i];
                s = r.image;
                let className = 'paneladdd';
                u.push(
                    <tr>
                        <td>


                            <div >
                                <img loading="lazy" src={s} />
                            </div>
                        </td>
                        <td style={className} >
                            <div >
                                <label>{r.count}</label>
                            </div>
                            <div >
                                <label>{r.count}</label>
                            </div>
                        </td>
                        <td>
                            <div >
                                <button>Добавить</button>
                            </div>
                        </td>
                        <td>
                            <div>
                                {y}
                            </div>
                        </td>
                    </tr>);
            }
        };

        xhr.send();

        return u;
    }
    render() {

        return <div >
            <table>
                {this.head()}
                {this.main()}
                </table>
        </div>;
    }
}

ReactDOM.render(
    <RedirectCoins />,
    document.getElementById("content")
);