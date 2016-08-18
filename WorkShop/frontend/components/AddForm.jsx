var React = require('react');
var InventoryStore = require('./../stores/inventory_store');
var ClientActions = require('./../actions/client_actions');

var AddForm = React.createClass({
  getInitialState: function () {
    return {itemName: null, itemPrice: null, itemQuant: null};
  },
  updateName: function (e) {
    this.setState({itemName: e.target.value});
  },
  updatePrice: function (e) {
    this.setState({itemPrice: e.target.value});
  },
  updateQuant: function (e) {
    this.setState({itemQuant: e.target.value});
  },
  handleSubmit: function (e) {
    e.preventDefault();
    var uniqueString = this.state.itemName + "|" + this.state.itemPrice;
    var itemData = this.state;
    itemData.uniqueId = uniqueString;
    ClientActions.addItemInv(itemData);
  },
  render: function () {
    return (
      <div className = "main main-add">
        <form onSubmit={this.handleSubmit}>
          <h1>Add to Inventory</h1>

          <input id="itemName-input" type="text" onChange={this.updateName} placeholder="item name" required></input>
          <input type="number" min="0.01" step="0.01" placeholder="item price (x.xx)" required onChange={this.updatePrice}></input>
          <input type="number" min="1" step="1" placeholder="item quantity" required onChange={this.updateQuant}></input>
          <input type="submit"></input>
        </form>
      </div>
    );
  }
});

module.exports = AddForm;
