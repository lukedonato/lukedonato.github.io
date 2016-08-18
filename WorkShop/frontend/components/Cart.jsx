var React = require('react');
var CartStore = require('../stores/cart_store.js');
var CartIndexItem = require('./CartIndexItem');

var Cart = React.createClass({
  getInitialState: function () {
    return ({cart: CartStore.all()});
  },
  componentDidMount: function () {
    this.CartListener = CartStore.addListener(this._onChange);
  },
  _onChange: function () {
    this.setState({cart: CartStore.all()});
  },
  componentWillUnmount: function () {
    this.CartListener.remove();
  },
  render: function () {
    var currentInventory = this.state.cart;
    var total = 0;
    var display = "";

    Object.keys(currentInventory).map( function (item) {
        total+= currentInventory[item][1] * currentInventory[item][2];
    });

    if (total === 0) {
      total = "";
      display = <p>Buy something silly!</p>;
    } else {
      total = "Total $" + total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
      display = <ul>
        {
          Object.keys(currentInventory).map( function (item) {
            if (currentInventory[item][2] > 0) {
              return (<CartIndexItem key={item} uniqueId={item} indexItem={currentInventory[item]}/>);
            }
          })
        }
      </ul>;
    }

    return (
      <div className = "main">
        <h1>Your Shopping Cart</h1>
        {display}
        <br/>
        <span className = "cart-total">{total}</span>
      </div>
    );
  }
});

module.exports = Cart;
