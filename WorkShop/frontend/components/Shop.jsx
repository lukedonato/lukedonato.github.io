var React = require('react');
var InventoryStore = require('../stores/inventory_store.js');
var ShopIndexItem = require('./ShopIndexItem');

var Shop = React.createClass({
  getInitialState: function () {
    return ({inventory: InventoryStore.all()});
  },
  componentDidMount: function () {
    this.ItemListener = InventoryStore.addListener(this._onChange);
  },
  _onChange: function () {
    this.setState({inventory: InventoryStore.all()});
  },
  componentWillUnmount: function () {
    this.ItemListener.remove();
  },
  render: function () {
    var currentInventory = this.state.inventory;

    return (
      <div className = "main">
        <h1>Our Inventory</h1>
        <ul>
          {
            Object.keys(currentInventory).map( function (item) {

                return (<ShopIndexItem key={item} uniqueId={item} indexItem={currentInventory[item]}/>);

            })
          }
        </ul>
      </div>

    );
  }
});

module.exports = Shop;
