var React = require('react');
var InventoryStore = require('../stores/inventory_store.js');
var ClientActions = require('./../actions/client_actions');

var ShopIndexItem = React.createClass({
  getInitialState: function () {
    return ({quantity: 0});
  },
  onChange: function (e) {
    this.setState({quantity: e.target.value});
  },
  handleSubmit: function (e) {
    e.preventDefault();
    var itemData = {};

    itemData.uniqueId = this.props.uniqueId;
    itemData.itemName = this.props.indexItem[0];
    itemData.itemPrice = this.props.indexItem[1];
    itemData.itemQuant = -(this.state.quantity);

    ClientActions.addItemCart(itemData);
  },
  render: function () {
    var inStock = "";
    var quantityInput = "";
    var addButton = "";

    if (this.props.indexItem[2] === 0) {
        inStock = <span className="red">SOLD OUT!</span>;
    } else {
        inStock = <span>{"In Stock " + this.props.indexItem[2]}</span>;
        quantityInput = <input type = "number" min="0" max={this.props.indexItem[2]} size="15" placeholder="#" onChange={this.onChange}/>;
        addButton = <input type = "submit" value = "Add to Cart"/>;
    }

    return (
      <li className="index-item clrfix">
        <div className="float-left">
          {this.props.indexItem[0]} <br/><br/>
          {"Price $" + this.props.indexItem[1]} <br/>
          {inStock}
         <br/>
        </div>
        <div className="float-right">
          <form onSubmit={this.handleSubmit}>
            {quantityInput}
            {addButton}
          </form>
        </div>
      </li>
    );
  }
});

module.exports = ShopIndexItem;
