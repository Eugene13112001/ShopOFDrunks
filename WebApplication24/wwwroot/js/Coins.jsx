
class Coins extends React.Component {
    constructor(props) {
        super(props);
        
       
        alert('');
        
    }
   
    render() {

        return <div >
            <form name="person">
                <div>
                    <h2>Новый продукт:</h2>
                </div>

                <div>
                    <div class="validation" ></div>
                    <div>
                        <label >Название:</label><br />
                        <input value={this.state.values.Name} onChange={this.onNameChange} type="text" name="Name" />
                        {this.checkname()}
                    </div>
                    <div>
                        <label >Count:</label><br />
                        <input value={this.state.values.Count} onChange={this.onCountChange} type="number" name="Count" />
                        {this.checkcount()}
                    </div>
                    <div>
                        <label >Price:</label><br />
                        <input value={this.state.values.Price} onChange={this.onPriceChange} type="number" name="Price" />
                        {this.checkprice()}
                    </div>
                    <div>
                        <label >Image:</label><br />
                        <input type="file" name="Image" />
                        {this.checkimg()}
                    </div>
                    <div>
                        <input onClick={this.add} type='button' />
                    </div>
                </div>

            </form>
        </div>;
    }
}

ReactDOM.render(
    <Add />,
    document.getElementById("content")
);