

class Add extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            label: [],
            error: {

                Name: 1,
                Count: 1,
                Price: 1,
                Image: 1
            },
            values: {

                Name: '',
                Count: 0,
                Price: 0,
                Image: []

            },

        };

        this.back = this.back.bind(this);
        this.add = this.add.bind(this);
        this.checkname = this.checkname.bind(this);
        this.checkcount = this.checkcount.bind(this);
        this.checkimg = this.checkimg.bind(this);
        this.checkprice = this.checkprice.bind(this);
        this.validateCount = this.validateCount.bind(this);
        this.validatePrice = this.validatePrice.bind(this);
        this.validateName = this.validateName.bind(this);
        this.onCountChange = this.onCountChange.bind(this);
        this.onPriceChange = this.onPriceChange.bind(this);
        this.labeloff = this.labeloff.bind(this);
        this.labelon = this.labelon.bind(this);
        this.getlab = this.getlab.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onImageChange = this.onImageChange.bind(this);
    }
    labelon() {
        let a = [];
        a.push(<div className="error"><label> Запись успешно добавлена</label></div>);
        this.setState({
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
    validateCount(newval) {
        if (((newval) > 0) && (newval < 151)) {
            return true;
        }
        return false;
    }
    onCountChange(e) {
        var val = e.target.value;
        var valid = this.validateCount(val);

        let er = this.state.error;
        let valu = this.state.values;
        valu.Count = val;
        if (valid == true) {
            er.Count = 0;
        }
        else {
            er.Count = 1;
        }
        this.setState({
            values: valu,
            error: er
        });
    }
    validatePrice(newval) {
        if (((newval) > 0) && (newval < 101)) {
            return true;
        }
        return false;
    }
    onImageChange(e) {
        var file = e.target.files[0];




        let er = this.state.error;
        let v = this.state.values;
        v.Image = file;
        er.Image = 0;
        this.setState({
            values: v,
            error: er
        });
    }
    onPriceChange(e) {
        var val = e.target.value;
        var valid = this.validatePrice(val);

        let er = this.state.error;
        let valu = this.state.values;
        valu.Price = val;
        if (valid == true) {
            er.Price = 0;
        }
        else {
            er.Price = 1;
        }
        this.setState({
            values: valu,
            error: er
        });
    }
    validateName(newval) {
        if ((newval.length) > 0) {
            return true;
        }
        return false;
    }
    onNameChange(e) {
        var val = e.target.value;

        var valid = this.validateName(val);

        let er = this.state.error;
        let valu = this.state.values;
        valu.Name = val;

        if (valid == true) {
            er.Name = 0;
        }
        else {
            er.Name = 1;
        }

        this.setState({
            values: valu,
            error: er
        });
    }
    add() {
        let kol = 0;
        for (let i in this.state.error) {
            if (i != "All") {
                let y = this.state.error[i];
                kol += y;
            }

        }
        if (kol == 0) {
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
            let itog = [];
            var formData = new FormData();
            var xhr = new XMLHttpRequest();
            formData.append('name', this.state.values.Name);
            formData.append('count', this.state.values.Count);
            formData.append('bit', this.state.values.Image);
            formData.append('price', this.state.values.Price);
            formData.append('key', y);
            xhr.open("POST", '/Admin/Add')

            xhr.onload = () => {
                const data = JSON.parse(xhr.responseText);
                itog = data;
                if (itog.All == 0) {
                    this.labelon();
                }
                this.setState({
                    error: itog
                });




            };
            xhr.send(formData);


        }

        else {
            this.labeloff();
        }




    }
    checkname() {

        if (this.state.error.Name != 0) {

            return <div> <span className="error">Неправильное значение имени</span> </div>;
        }
        return <div><span></span></div>;
    }
    checkcount() {

        if (this.state.error.Count != 0) {
            return <div><span className="error">Неправильное значение количества</span></div>;
        }
        return <div><span></span></div>;
    }
    checkimg() {
        if (this.state.error.Image != 0) {
            return <div><span className="error">Не загружено изображение</span></div>
        }
        return <div><span></span></div>;
    }
    checkprice() {
        if (this.state.error.Price != 0) {
            return <div><span className="error">Неправильное значение цены</span></div>
        }
        return <div><span></span></div>;
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
        let p = "https://localhost:44303/Admin/Products?key=" + y;
        window.location.replace(p);
    }
    render() {

        return <div className="mainl" >
            <div className="first"></div>
            <div className="main" >
                <div>
                    <h2 className="title">Новый продукт:</h2>
                </div>

                <div className="panel">

                    <div className="line">
                        <div>
                            <label >Название:</label><br />
                            <input value={this.state.values.Name} onChange={this.onNameChange} type="text" name="Name" />
                        </div>
                        {this.checkname()}
                    </div>
                    <div className="line">
                        <div>
                            <label >Count:</label><br />
                            <input value={this.state.values.Count} onChange={this.onCountChange} type="number" name="Count" />
                        </div>
                        {this.checkcount()}
                    </div>
                    <div className="line">
                        <div>
                            <label >Price:</label><br />
                            <input value={this.state.values.Price} onChange={this.onPriceChange} type="number" name="Price" />
                        </div>
                        {this.checkprice()}
                    </div>
                    <div className="line">
                        <div>
                            <label >Image:</label><br />
                            <input onChange={this.onImageChange} type="file" name="Image" />
                        </div>
                        {this.checkimg()}
                    </div>
                    <div className="line">
                        <button className="addbtn" onClick={this.add} >Add</button>
                    </div>

                </div>
                <div className="backpan">
                    <button className=" back" onClick={this.back} >Back</button>
                </div>
            </div>
            {this.getlab()}
        </div>;
    }
}

ReactDOM.render(
    <Add />,
    document.getElementById("content")
);